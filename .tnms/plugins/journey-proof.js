// journey-proof — a pipeline plugin written the way a customer writes one (SHIP-1722).
//
// Plain JavaScript in my own repository. No build, no registration: the file sits in my
// project's plugin folder and its file name is its name. It extends the kit's base class and
// touches the platform only through the toolkit it is handed (log, branch, workspace, variables,
// fail, stop). The acceptance journey commits this file to the test repository with JOURNEY
// filled in (tests/acceptance/fixtures/plugin-journey/expectations.mjs) and nothing else changed.
//
// The test repository (ship-a-website) declares "type": "module" in its package.json, so a `.js`
// file there is an ES module and its developer writes import/export — so does this file. In a
// CommonJS repository the same plugin would use require/module.exports (or be named `.cjs`).

import fs from "node:fs";
import path from "node:path";

// ═══════════════════════════════ KIT ASSUMPTIONS ═══════════════════════════════
// The ONE place that knows the kit's API. Written first against the most obvious API the story
// implied; adjusted 2026-10-19 to the kit's published interface (packages/pipeline-plugin-kit/
// index.d.ts: `Plugin` with `run(toolkit)`, toolkit {log, branch, workspace, variables, stage,
// phase, fail, stop}). Adjust THIS BLOCK if the kit changes — and nothing else: every line, file
// and message the journey expects is computed outside it, so expectations cannot move with it.
//
// A1  The kit's package name. The worker provides it at run time; installing it locally only
//     gives my editor its types.
import * as kit from "@tnms/pipeline-plugin-kit";
// A2  The base class a plugin extends.
const BasePlugin = kit.Plugin;
// A3  The method the worker calls. Which phase it runs in is decided by where the developer lists
//     the plugin on the stage (the journey lists it under hooks.before, so what it writes is in
//     the end-of-stage commit, ADR-234).
const RUN_METHOD = "run";
// A4  Where the toolkit arrives: the phase method's first argument.
const toolkitOf = (args) => args[0];
// A5–A8  Reading the toolkit. Each accepts a value or an accessor, because the story names the
//        capability, not its shape.
const read = async (member, ...a) => (typeof member === "function" ? member(...a) : member);
const branchName = async (tk) => {
  const b = await read(tk.branch);
  return typeof b === "string" ? b : b && (b.name || b.ref);
};
const workspaceDir = async (tk) => {
  const w = await read(tk.workspace);
  return typeof w === "string" ? w : w && (w.path || w.root || w.dir);
};
const variable = async (tk, name) => {
  const v = tk.variables;
  if (typeof v === "function") return v(name);
  if (v && typeof v.get === "function") return v.get(name);
  return v && v[name];
};
const log = async (tk, line) => (typeof tk.log === "function" ? tk.log(line) : tk.log.info(line));
// A9  Failing the stage with my own message (the kit declares what the error is; the worker
//     recognises it by that declaration, not by which copy of the kit made it).
const failStage = (tk, message) => tk.fail(message);
// A10 Stopping the run on purpose — it should end "stopped", never "failed".
const stopRun = (tk, message) => tk.stop(message);
// ═════════════════════════════ END KIT ASSUMPTIONS ═════════════════════════════

/* The journey fills this in: mode, nonce, and every line/file/message — see expectations.mjs. */
const JOURNEY = {
  "mode": "fail",
  "nonce": "j20261020223040e33g",
  "pluginName": "journey-proof",
  "hello": "journey-proof says hello from my own repository (j20261020223040e33g)",
  "toolkitPrefix": "journey-proof was handed: ",
  "branchPrefix": "journey-proof is on branch: ",
  "variableName": "site_root",
  "variablePrefix": "journey-proof read site_root=",
  "wroteFile": "journey-proof/j20261020223040e33g.txt",
  "wrotePrefix": "journey-proof wrote: ",
  "failMessage": "My plugin refused this stage on purpose (j20261020223040e33g)",
  "stopMessage": "My plugin stopped this run on purpose (j20261020223040e33g)"
};

/** Every member name the toolkit exposes, own and inherited — names only, never values. */
function memberNames(obj) {
  const names = new Set();
  for (let o = obj; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
    for (const k of Object.getOwnPropertyNames(o)) if (k !== "constructor") names.add(k);
  }
  return [...names].sort();
}

export default class JourneyProof extends BasePlugin {
  async [RUN_METHOD](...args) {
    const tk = toolkitOf(args);
    await log(tk, `${JOURNEY.toolkitPrefix}${memberNames(tk).join(",")}`);
    await log(tk, JOURNEY.hello);
    const branch = await branchName(tk);
    await log(tk, `${JOURNEY.branchPrefix}${branch}`);
    await log(tk, `${JOURNEY.variablePrefix}${await variable(tk, JOURNEY.variableName)}`);

    if (JOURNEY.mode === "fail") return failStage(tk, JOURNEY.failMessage);
    if (JOURNEY.mode === "stop") return stopRun(tk, JOURNEY.stopMessage);

    const target = path.join(await workspaceDir(tk), JOURNEY.wroteFile);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, `${JOURNEY.nonce}\nbranch=${branch}\n`);
    await log(tk, `${JOURNEY.wrotePrefix}${JOURNEY.wroteFile}`);
  }
}
