# Server Mech (Step 4)

PolicyPay server-side mech adapter for Olas **Monetize Your Agent** track.

## What this does
- exposes `/mech/serve`
- opens/accepts/submits/releases jobs through `@policypay/api`
- anchors receipt hashes on-chain
- tracks served count for proof (`/stats`)

## Run
```bash
# terminal 1: API
npm run -w @policypay/api dev

# terminal 2: server mech
npm run -w @policypay/server-mech dev

# quick serve test
curl -X POST http://localhost:4100/mech/serve \
  -H "content-type: application/json" \
  -d '{"requester":"olas-client-agent","task":"quote+settle usdc","amountEth":"0.0001"}'
```

## Load for bounty proof
```bash
# serves 50 requests for Olas monetization qualification proof
SERVE_COUNT=50 npm run -w @policypay/server-mech serve:50
```

## Env
- `POLICYPAY_API_BASE` (default `http://localhost:4000`)
- `SERVER_MECH_PORT` (default `4100`)
- `POLICYPAY_POLICY_ID` (default `policy/base-sepolia/default`)
- `SERVER_MECH_BASE` for load script (default `http://localhost:4100`)
