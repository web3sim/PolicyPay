#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

mkdir -p artifacts

export API_PORT=${API_PORT:-4000}
export SERVER_MECH_PORT=${SERVER_MECH_PORT:-4100}
export BASE_SEPOLIA_RPC_URL=${BASE_SEPOLIA_RPC_URL:-https://sepolia.base.org}
export DEPLOYER_PRIVATE_KEY=${DEPLOYER_PRIVATE_KEY:-}
export POLICY_PAY_CORE_ADDRESS=${POLICY_PAY_CORE_ADDRESS:-0x051cAD2fcf7D1ff415c35a8090f0507D454bd608}
export POLICYPAY_API_BASE=${POLICYPAY_API_BASE:-http://localhost:${API_PORT}}
export SERVER_MECH_BASE=${SERVER_MECH_BASE:-http://localhost:${SERVER_MECH_PORT}}
export MOONPAY_ENABLE_EXECUTION=${MOONPAY_ENABLE_EXECUTION:-true}
export MOONPAY_BIN=${MOONPAY_BIN:-./node_modules/.bin/mp}

if [[ -z "$DEPLOYER_PRIVATE_KEY" ]]; then
  echo "DEPLOYER_PRIVATE_KEY is required" >&2
  exit 1
fi

# start api + server mech
node apps/api/src/index.js > artifacts/api.log 2>&1 &
API_PID=$!
SERVER_MECH_PORT=$SERVER_MECH_PORT POLICYPAY_API_BASE=$POLICYPAY_API_BASE MOONPAY_ENABLE_EXECUTION=$MOONPAY_ENABLE_EXECUTION MOONPAY_BIN=$MOONPAY_BIN \
  node agents/server-mech/src/server.js > artifacts/server-mech.log 2>&1 &
MECH_PID=$!

cleanup() {
  kill $API_PID $MECH_PID >/dev/null 2>&1 || true
}
trap cleanup EXIT

sleep 3

curl -s "http://localhost:${API_PORT}/health" > artifacts/health-api.json
curl -s "http://localhost:${SERVER_MECH_PORT}/health" > artifacts/health-mech.json

# 10 hires
HIRE_COUNT=10 SERVER_MECH_BASE="http://localhost:${SERVER_MECH_PORT}" node agents/client-mech/scripts/hire-load.js > artifacts/hire-10.json

# additional 40 serves to reach >=50 total (assuming 10 from hires)
SERVE_COUNT=40 SERVER_MECH_BASE="http://localhost:${SERVER_MECH_PORT}" node agents/server-mech/scripts/serve-load.js > artifacts/serve-40.json

curl -s "http://localhost:${SERVER_MECH_PORT}/stats" > artifacts/server-stats.json

node - <<'NODE'
const fs=require('fs');
const hire=JSON.parse(fs.readFileSync('artifacts/hire-10.json','utf8'));
const serve=JSON.parse(fs.readFileSync('artifacts/serve-40.json','utf8'));
const stats=JSON.parse(fs.readFileSync('artifacts/server-stats.json','utf8'));
const summary={
  hireRequested:hire.requested,
  hireCompleted:hire.completed,
  serveRequested:serve.requested,
  serveCompleted:serve.served,
  totalServed:stats.total,
  timestamp:new Date().toISOString()
};
fs.writeFileSync('artifacts/e2e-summary.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
NODE

