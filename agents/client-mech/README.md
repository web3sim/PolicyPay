# Client Mech (Step 5)

PolicyPay client-side mech adapter for Olas **Hire an Agent** track.

## What this does
- sends hire requests to server mech (`/mech/serve`)
- records completed hires with jobId + receipt hash
- supports batch mode for bounty qualification (`10+` requests)

## Run
```bash
# one hire call
npm run -w @policypay/client-mech dev

# run 10 hires (qualification target)
HIRE_COUNT=10 npm run -w @policypay/client-mech hire:10
```

## Env
- `SERVER_MECH_BASE` (default `http://localhost:4100`)
- `CLIENT_TASK` (optional, single run)
- `CLIENT_AMOUNT_ETH` (default `0.0001`)
