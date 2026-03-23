# PolicyPay Mesh — 3 Minute Demo Script

## 0:00–0:20 — Problem
"Agents can move money, but trust and execution safety are missing. PolicyPay Mesh adds policy-constrained execution, on-chain receipts, and monetizable agent services."

## 0:20–0:55 — Architecture
- Olas **client-mech** sends hire requests
- Olas **server-mech** serves requests and executes lifecycle
- `PolicyPayCore` on Base Sepolia enforces escrow + release + receipts
- MoonPay CLI executes real wallet operations

## 0:55–1:40 — Live Flow
1. Trigger a hire request (`hire-load` / single request)
2. Show API + server health on dashboard
3. Show server `/stats` count increment
4. Show latest job with request hash, result hash, receipt hash

## 1:40–2:20 — On-chain Proof
- Show deployed contract address on Base Sepolia
- Show a recent tx hash from API responses
- Explain status flow: Open → Accepted → Submitted → Released

## 2:20–2:45 — MoonPay Proof
- Show MoonPay mode as `executed`
- Show executed command and output snippet from server response

## 2:45–3:00 — Bounty Alignment
- Olas Hire: completed request pipeline
- Olas Monetize: server-side servicing loop + counters
- MoonPay: real CLI integration in mech execution path
