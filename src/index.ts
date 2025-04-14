import { toolExecution } from "./benchmarks/tool-execution.js";

console.log("starting");
(async () => {
  await toolExecution();
})();
