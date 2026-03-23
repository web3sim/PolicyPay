import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function toArgs(command, opts = {}) {
  const args = command.split(" ");
  for (const [k, v] of Object.entries(opts)) {
    if (v === undefined || v === null || v === "") continue;
    args.push(`--${k}`);
    args.push(String(v));
  }
  return args;
}

export async function runMoonPayTool({
  tool = "token balance list",
  options = {},
  simulation = true,
}) {
  const bin = process.env.MOONPAY_BIN || "./node_modules/.bin/mp";
  const canExecute = process.env.MOONPAY_ENABLE_EXECUTION === "true";

  if (!canExecute) {
    return {
      ok: true,
      mode: "skipped",
      reason: "MOONPAY_ENABLE_EXECUTION is not true",
      plannedCommand: [bin, ...toArgs(tool, options)].join(" "),
    };
  }

  const args = toArgs(tool, options);

  if (simulation) {
    return {
      ok: true,
      mode: "simulation",
      plannedCommand: [bin, ...args].join(" "),
    };
  }

  try {
    const { stdout, stderr } = await execFileAsync(bin, args, {
      timeout: Number(process.env.MOONPAY_TIMEOUT_MS || 120000),
      maxBuffer: 1024 * 1024 * 4,
    });

    return {
      ok: true,
      mode: "executed",
      command: [bin, ...args].join(" "),
      stdout,
      stderr,
    };
  } catch (error) {
    return {
      ok: false,
      mode: "executed",
      command: [bin, ...args].join(" "),
      error: error?.message || "MoonPay command failed",
      stdout: error?.stdout,
      stderr: error?.stderr,
    };
  }
}
