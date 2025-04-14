import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { AGENT_ID, AZURE_CONN_STRING } from "../env.js";
import { createLogger } from "../logger.js";

const client = AIProjectsClient.fromConnectionString(
  AZURE_CONN_STRING,
  new DefaultAzureCredential(),
);

export async function toolExecution() {
  const logger = createLogger("tool-execution.log");

  const run = await client.agents
    .createThreadAndRun(AGENT_ID, {
      thread: { messages: [{ role: "user", content: "Lookup my profile" }] },
    })
    .stream();

  for await (const chunk of run) {
    logger.log(chunk.event, "\n", JSON.stringify(chunk, null, 2));
  }
}
