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
1. Bootstrap monorepo + env contract
2. Contracts (policy + receipts)
3. API orchestration
4. Olas server mech integration
5. Olas client mech integration
6. MoonPay CLI execution adapter
7. Frontend dashboard
8. E2E flow + load scripts (10 hire / 50 serve)
9. CI/CD + deployment
10. Submission artifacts

## Required Secrets (to be provided)
See `.env.example`.
