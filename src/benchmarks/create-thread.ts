import { AIProjectsClient, ThreadRunOutput } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { AGENT_ID, AZURE_CONN_STRING } from "../env.js";
import { createLogger } from "../logger.js";

const client = AIProjectsClient.fromConnectionString(
  AZURE_CONN_STRING,
  new DefaultAzureCredential(),
);

export async function createThread() {
  const logger = createLogger("create-thread.log");

  const run = await client.agents.createThreadAndRun(AGENT_ID).stream();

  const eventSet = new Set();

  let threadId: string = "";

  for await (const chunk of run) {
    if (chunk.event === "thread.created") {
      const data = chunk.data as ThreadRunOutput;
      threadId = data.id;
    }

    if (!eventSet.has(chunk.event)) {
      logger.snapshot(chunk.event);
      eventSet.add(chunk.event);
    }

    logger.log(chunk.event, "\n", JSON.stringify(chunk, null, 2));
  }

  logger.printSnapshots();

  return threadId;
}
