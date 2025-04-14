import { createMessage } from "./benchmarks/create-message.js";
import { createThread } from "./benchmarks/create-thread.js";
import { toolExecution } from "./benchmarks/tool-execution.js";

console.log("starting");
(async () => {
  const threadId = await createThread();
  console.log("\n");
  await createMessage(threadId);
  console.log("\n");
  await toolExecution(threadId);
})();
