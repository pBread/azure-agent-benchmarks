import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { AGENT_ID, AZURE_CONN_STRING } from "../env.js";
import { createLogger } from "../logger.js";

const client = AIProjectsClient.fromConnectionString(
  AZURE_CONN_STRING,
  new DefaultAzureCredential(),
);

export async function toolExecution(threadId: string) {
  const logger = createLogger("tool-execution");
  logger.log(threadId);

  const run = await client.agents
    .createRun(threadId, AGENT_ID, {
      additionalMessages: [
        { role: "user", content: "Lookup my profile, please." },
      ],
    })
    .stream();

  const eventSet = new Set();

  for await (const chunk of run) {
    if (!eventSet.has(chunk.event)) {
      logger.snapshot(chunk.event);
      eventSet.add(chunk.event);
    }

    logger.log(chunk.event, "\n", JSON.stringify(chunk, null, 2));
  }

  logger.printSnapshots();

  return logger.printSnapshots;
}
