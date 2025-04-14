# Azure Agent API Benchmarks

## Create Agent

1. Create an agent in Azure, add `AGENT_ID` to .env
2. Add prompt, see agent/prompt.md for example
3. Add a tool `get_user_profile`, see agent/get_caller_profile.json for schema.

- note: you must update the URL in the schema to your ngrok domain

## Populate Env Vars

Populate the env vars. It should be self explanatory.

Note, the `OPENAI_API_KEY` is optional. It is an API Key from the OpenAI platform. It's used as a benchmark.

## Start Server for Tool

```bash
npm run route
npm run grok
```
