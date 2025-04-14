import { createMessage } from "./benchmarks/create-message.js";
import { createThread } from "./benchmarks/create-thread.js";
import { toolExecution } from "./benchmarks/tool-execution.js";

console.log("starting");
(async () => {
  const [threadId, printCreateThread] = await createThread();
  console.log("\n");
  const printCreateMessage = await createMessage(threadId);
  console.log("\n");
  const printeToolExecution = await toolExecution(threadId);

  console.log("results");
  printCreateThread();
  await sleep();
  printCreateMessage();
  await sleep();
  printeToolExecution();
  await sleep();
})();

async function sleep(ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}
