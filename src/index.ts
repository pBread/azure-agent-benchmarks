import { createMessage } from "./benchmarks/agent-create-message.js";
import { createThread } from "./benchmarks/agent-create-thread.js";
import { toolExecution } from "./benchmarks/agent-tool-execution.js";
import { openAiCompletionCreateMessage } from "./benchmarks/openai-create-message.js";
import { openaiResponseSimple } from "./benchmarks/openai-response-simple.js";
import { openaiResponseTool } from "./benchmarks/openai-response-tools.js";

console.log("starting");
(async () => {
  const printOpenAiCompletionCreateMessage =
    await openAiCompletionCreateMessage();
  console.log("\n");

  const printOpenaiResponseSimple = await openaiResponseSimple();
  console.log("\n");

  const printOpenaiResponseTool = await openaiResponseTool();
  console.log("\n");

  const [threadId, printCreateThread] = await createThread();
  console.log("\n");
  const printCreateMessage = await createMessage(threadId);
  console.log("\n");
  const printToolExecution = await toolExecution(threadId);

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
  printToolExecution();
  await sleep();

  console.log("printOpenAiCompletionCreateMessage");
  printOpenAiCompletionCreateMessage();
  await sleep();
  console.log("\n");

  console.log("printOpenaiResponseTool");
  printOpenaiResponseTool();
  await sleep();
  console.log("\n");

  console.log("printOpenaiResponseSimple");
  printOpenaiResponseSimple();
  await sleep();
  console.log("\n");

  console.log("printOpenaiResponseTool");
  printOpenaiResponseTool();
  await sleep();
})();

async function sleep(ms = 250) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}
