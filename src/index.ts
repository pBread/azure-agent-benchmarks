import { createMessage } from "./benchmarks/agent-create-message.js";
import { createThread } from "./benchmarks/agent-create-thread.js";
import { toolExecution } from "./benchmarks/agent-tool-execution.js";
import { openAiCreateMessage } from "./benchmarks/openai-create-message.js";

console.log("starting");
(async () => {
  const printOpenAiCreateMessage = await openAiCreateMessage();
  console.log("\n");

  const [threadId, printCreateThread] = await createThread();
  console.log("\n");
  const printCreateMessage = await createMessage(threadId);
  console.log("\n");
  const printeToolExecution = await toolExecution(threadId);

  console.log("\n");
  console.log("openAiCreateMessage");
  printOpenAiCreateMessage();
  await sleep();

  console.log("\n");
  console.log("createThread");
  printCreateThread();
  await sleep();

  console.log("\n");
  console.log("createMessage");
  printCreateMessage();
  await sleep();

  console.log("\n");
  console.log("toolExecution");
  printeToolExecution();
  await sleep();
})();

async function sleep(ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}
