import "dotenv-flow/config";

export const AGENT_ID = process.env.AGENT_ID as string;
if (!AGENT_ID) throw Error(`Missing AGENT_ID`);

export const AZURE_CONN_STRING = process.env.AZURE_CONN_STRING as string;
if (!AZURE_CONN_STRING) throw Error(`Missing AZURE_CONN_STRING`);

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
if (!OPENAI_API_KEY) throw Error(`Missing OPENAI_API_KEY`);
