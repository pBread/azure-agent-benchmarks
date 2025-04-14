import { toolExecution } from "./benchmarks/tool-execution.js";
import { createThread } from "./benchmarks/create-thread.js";

console.log("starting");
(async () => {
  const threadId = await createThread();
  console.log("\n");
  await toolExecution(threadId);
})();
