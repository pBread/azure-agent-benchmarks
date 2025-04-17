import OpenAI from "openai";
import { OPENAI_API_KEY } from "../env.js";
import { createLogger } from "../logger.js";

export async function openaiResponseTool() {
  const logger = createLogger("openai-response-tool");
  if (!OPENAI_API_KEY) {
    console.log("No OPENAI_API_KEY");
    return logger.printSnapshots;
  }
  const client = new OpenAI({ apiKey: OPENAI_API_KEY });

  const stream = await client.responses.create({
    model: "gpt-4o",
    tools: [
      {
        type: "function",
        name: "get_weather",
        strict: true,
        description: "Get the weather for a location",
        parameters: {
          type: "object",
          properties: { location: { type: "string" } },
          required: ["location"],
          additionalProperties: false,
        },
      },
    ],
    input: [
      { role: "user", content: "Hello, what's the weather in Denver today?" },
    ],
    stream: true,
  });

  const eventSet = new Set();

  for await (const chunk of stream) {
    if (!eventSet.has(chunk.type)) {
      logger.snapshot(chunk.type);
      eventSet.add(chunk.type);
    }

    logger.log("chunk\n", JSON.stringify(chunk, null, 2));
  }

  logger.snapshot("stream finished");

  console.log("\n");
  logger.printSnapshots();

  return logger.printSnapshots;
}
