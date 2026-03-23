# Bounty Mapping — PolicyPay Mesh

## 1) Monetize Your Agent on Olas Marketplace
- `agents/server-mech/src/server.js` handles serve lifecycle
- `/mech/serve` executes full request → on-chain settlement
- `serve-load.js` supports scaled serving metrics

## 2) Hire an Agent on Olas Marketplace
- `agents/client-mech/src/client.js` sends hire requests
- `hire-load.js` runs batch hiring for qualification metrics

## 3) MoonPay CLI Agents
- `agents/server-mech/src/moonpay.js` executes real `mp` CLI commands
- execution mode controlled via `MOONPAY_ENABLE_EXECUTION=true`
- moonpay execution metadata persisted in mech response

## 4) OpenWallet / Wallet-safe execution (supporting)
- local wallet + non-custodial execution path through MoonPay CLI
- contract-side policy constraints for payment actions

## 5) Build an Agent for Pearl (extension path)
- current mech architecture can be adapted to Pearl integration checklist
