<!-- MARKEE:START:0xa3dba95c1cb488567de807859e68219088d19d45 -->
> 🪧🪧🪧🪧🪧🪧🪧 MARKEE 🪧🪧🪧🪧🪧🪧🪧
>
> gm🪧
>
> 
>
> 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧
>
> *Change this message for 0.002 ETH on the [Markee App](https://markee.xyz/ecosystem/platforms/github/0xa3dba95c1cb488567de807859e68219088d19d45).*
<!-- MARKEE:END:0xa3dba95c1cb488567de807859e68219088d19d45 -->
# PolicyPay — Programmable Payments with Policy Enforcement

PolicyPay is Web3-native payment infrastructure for automated, policy-governed fund movement.

## Overview
PolicyPay enables deterministic payment execution based on explicit rules instead of manual approval chains.

### Problem
Traditional and onchain payment workflows often rely on:
- Manual payment operations
- Ad-hoc conditional logic
- Trust-based escrow and release decisions

This creates operational risk, delayed settlements, and inconsistent execution.

### Solution
PolicyPay introduces:
- Policy-based automation for payout rules
- Escrow-enforced fund control
- Deterministic execution paths for release/refund/slash outcomes

## Key Features
- Policy-based payment execution
- Conditional payouts (time, event, verification-driven)
- Escrow-controlled funds
- Smart contract enforced state transitions
- Automation-ready workflows for agents and applications

## Use Cases
- DAO contributor payroll
- Milestone-based contractor payments
- Subscription and recurring settlements
- Autonomous agent-to-agent payouts

## How It Works
1. Define a payment policy
2. Lock funds into escrow
3. Monitor and evaluate policy conditions
4. Execute payout path (release/refund/slash)

## Getting Started
### Prerequisites
- Node.js 22+
- npm 10+
- Base Sepolia RPC endpoint
- Test wallet private key
- MoonPay CLI auth (for real payment tool execution)

### Installation
```bash
git clone https://github.com/web3sim/PolicyPay.git
cd PolicyPay
npm install
```

### Environment Variables
Create a local `.env` file:
```bash
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
DEPLOYER_PRIVATE_KEY=0x...
POLICY_PAY_CORE_ADDRESS=0x051cAD2fcf7D1ff415c35a8090f0507D454bd608
API_PORT=4000
SERVER_MECH_PORT=4100
POLICYPAY_API_BASE=http://localhost:4000
MOONPAY_ENABLE_EXECUTION=true
MOONPAY_BIN=./node_modules/.bin/mp
MOONPAY_WALLET_NAME=main
```

### Run Locally
```bash
# Terminal 1
npm run -w @policypay/api dev

# Terminal 2
npm run -w @policypay/server-mech dev

# Terminal 3
npm run -w @policypay/web dev
```

## Usage
### Create Policy (deployed default policy exists)
Policy setup is handled in contract deployment scripts and can be extended via API/contract calls.

### Fund Escrow / Open Job
```bash
curl -X POST http://localhost:4000/jobs/open \
  -H "content-type: application/json" \
  -d '{
    "jobId":"job/demo/1",
    "policyId":"policy/base-sepolia/default",
    "requestHash":"request/demo/1",
    "amountEth":"0.0001"
  }'
```

### Trigger Conditions / Serve Request
```bash
curl -X POST http://localhost:4100/mech/serve \
  -H "content-type: application/json" \
  -d '{
    "requester":"olas-client-agent",
    "task":"settle demo payout",
    "amountEth":"0.0001",
    "moonpay": {
      "enabled": true,
      "simulation": false,
      "tool": "token balance list",
      "options": {"wallet":"main","chain":"base-sepolia"}
    }
  }'
```

### Execute Payout Path
The lifecycle executes through contract-backed endpoints (`accept`, `submit`, `anchor`, `release`).

## API / SDK
### Core HTTP Endpoints
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

### Example: Read Policy
```bash
curl http://localhost:4000/policies/policy/base-sepolia/default
```

## Tech Stack
- Solidity (EVM, Base Sepolia)
- Node.js backend services
- Next.js 16 frontend
- ethers.js + Hardhat
- Olas mech client/server integrations
- MoonPay CLI execution adapter

## Roadmap
- Complete Pearl integration path
- Add richer policy composition primitives
- Expand multi-chain support
- Add production relayer queueing and observability

## Contributing
1. Fork the repository
2. Create a feature branch
3. Add tests for behavior changes
4. Submit a pull request with a clear scope

## License
MIT

PolicyPay makes autonomous, rule-enforced payments operational for real-world Web3 systems.
