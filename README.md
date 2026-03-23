# PolicyPay (Olas x MoonPay)

Policy-constrained agent payments with Olas mech-client/mech-server and MoonPay execution rails.

## Monorepo Layout
- `apps/web`: Next.js frontend
- `apps/api`: Backend orchestrator API
- `packages/contracts`: Solidity contracts + tests
- `packages/shared`: Shared types/utils
- `agents/client-mech`: Olas mech-client integration
- `agents/server-mech`: Olas mech-server tool implementation

## Step Roadmap
1. Bootstrap monorepo + env contract ✅
2. Contracts (policy + receipts) ✅
3. API orchestration ✅
4. Olas server mech integration ✅
5. Olas client mech integration ✅
6. MoonPay CLI execution adapter ✅
7. Frontend dashboard
8. E2E flow + load scripts (10 hire / 50 serve)
9. CI/CD + deployment
10. Submission artifacts

## Required Secrets (to be provided)
See `.env.example`.

## Contracts (Step 2)
```bash
npm i
npm run -w @policypay/contracts build
npm run -w @policypay/contracts test
npm run -w @policypay/contracts deploy:base-sepolia
```

Contracts shipped in Step 2:
- `PolicyPayCore` - policy registry, escrow job lifecycle, receipt anchoring.

## API (Step 3)
```bash
# start API
npm run -w @policypay/api dev

# health
curl http://localhost:4000/health

# read policy (id can be raw string or 0x bytes32)
curl http://localhost:4000/policies/policy/base-sepolia/default
```

Core endpoints:
- `GET /health`
- `GET /config`
- `GET /policies/:policyId`
- `GET /jobs/:jobId`
- `POST /jobs/open`
- `POST /jobs/:jobId/accept`
- `POST /jobs/:jobId/submit`
- `POST /receipts/anchor`
- `POST /jobs/:jobId/release`
- `POST /jobs/:jobId/refund`
