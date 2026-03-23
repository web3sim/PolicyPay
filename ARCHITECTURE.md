# ARCHITECTURE

## 1. Overview
PolicyPay is a policy-driven payment execution system composed of onchain settlement contracts and offchain orchestration services.

The core model is:
1. Encode payout constraints as policy
2. Lock funds in escrow
3. Evaluate condition state
4. Execute deterministic release path onchain

This separates payment intent from payment execution and removes manual, trust-based settlement decisions from critical flow paths.

## 2. Core Components

### 2.1 Smart Contracts Layer
**Primary contract:** `PolicyPayCore`

Responsibilities:
- Policy storage and activation (`upsertPolicy`)
- Job escrow lifecycle (`openJob`, `acceptJob`, `submitResult`)
- Receipt anchoring (`anchorReceipt`)
- Settlement execution (`release`, `refund`, `slashToTreasury`)

Onchain state primitives:
- `Policy { dailyLimitWei, maxPerJobWei, active }`
- `Job { payer, worker, amount, policyId, requestHash, resultHash, createdAt, status }`
- `receiptUsed[receiptHash]` to prevent replay anchors

Deterministic status machine:
- `None -> Open -> Accepted -> Submitted -> Released`
- Alternate paths:
  - `Open/Accepted -> Refunded`
  - `Accepted/Submitted -> Slashed`

### 2.2 Policy Engine
Policy definition currently supports bounded-value constraints:
- Daily limit
- Per-job max
- Active/inactive enforcement

Condition families (design-level):
1. Time-based: execute only within window / before expiry
2. Event-based: execute only after objective event emission
3. Verification-based: execute only after receipt and proof checks

Evaluation mechanism:
- Onchain hard checks for value and lifecycle validity
- Offchain orchestration decides execution timing and supplies proofs/hashes

### 2.3 Execution Layer
Execution actors:
- Client agents (hire request initiators)
- Server agents (job processors)
- Contract owner/admin (policy and slash controls)

Deterministic payout logic:
- Release only from `Submitted`
- Refund only from `Open` / `Accepted`
- Slash only by owner from `Accepted` / `Submitted`

Failure handling:
- Invalid state transitions revert
- Unauthorized callers revert
- Duplicate receipt anchors revert
- Transfer failure reverts transaction atomically

### 2.4 Backend / Relayer
Backend service (`apps/api`) provides contract-backed HTTP endpoints.

Responsibilities:
- Read API for jobs/policies/health
- Write API for lifecycle transitions
- Nonce-managed transaction submission
- Retry handling for nonce-related chain errors
- Serialization queue for write operations

Automation path:
- `agents/server-mech` calls API endpoints in sequence for each request
- `agents/client-mech` drives request volume and hire workflows

### 2.5 Frontend
Frontend (`apps/web`, Next.js 16) provides:
- Landing/onboarding surface
- Live telemetry panel:
  - API health
  - served request count
  - latest MoonPay execution mode/command
  - recent job records

This is an operations and demo-facing interface, not a custody surface.

## 3. Data Flow
1. **Policy Creation**
   - Owner registers/updates policy onchain
2. **Fund Locking**
   - Payer opens job and deposits escrow value
3. **Condition Monitoring**
   - Offchain services watch task progress and policy context
4. **Evaluation**
   - Server agent determines completion and produces result hash
5. **Execution**
   - Job accepted, result submitted, receipt anchored
6. **Fund Release**
   - Release path sends escrow to worker
   - Alternate refund/slash paths apply when conditions fail

## 4. Trust Model
Onchain responsibilities:
- Fund custody
- State transition integrity
- Authorization enforcement
- Settlement finality

Offchain responsibilities:
- Request orchestration
- Condition observation and workflow control
- MoonPay command invocation
- Telemetry and batching

Trust assumptions:
- Contract logic is canonical for settlement
- Offchain actor integrity required for when/what to execute
- External tool responses (e.g., MoonPay CLI output) are treated as operational inputs, not consensus truth

## 5. Extensibility
- New policy types via expanded policy schema or modular policy contracts
- Oracle integrations for external event conditions
- Additional verification adapters for richer receipt validation
- Multi-chain deployment via per-chain contract registry and relayer routing

## 6. Failure Cases
1. **Condition failure**
   - Keep job unreleased; route to refund/slash path
2. **Policy expiry/window miss**
   - Mark non-executable; refund or slash by governance rule
3. **Partial execution**
   - If offchain sequence breaks, onchain status remains auditable and resumable from last valid state
4. **Transaction nonce contention**
   - Managed by API serialization + nonce retry strategy

## 7. Security Considerations
- Reentrancy safety by state-first transitions and controlled transfer points
- Access control via owner-only policy/slash operations
- Input validation on policy IDs, hashes, and amounts
- Replay protection through unique receipt anchoring
- Fund safety through escrow contract custody and strict status-gated exits
- Operational safety through explicit simulation/execution toggles for external command adapters

## 8. Future Improvements
- Composable policy DAGs (AND/OR conditions)
- Native deadline/expiry fields and automatic timeout paths
- Cross-chain settlement coordinator
- zk-attested verification proofs for result receipts
- AI-assisted policy drafting with static safety checks before activation
