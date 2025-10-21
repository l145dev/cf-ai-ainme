# Prompts used to develop AInme

> [!NOTE]
> I started off as a complete beginner to Cloudflare's cloud service and agents sdk, you may see some dumb questions in here so please don't get triggered!

## Research (Perplexity)

### Discovery of Cloudflare's Cloud services

```
LLM (recommend using Llama 3.3 on Workers AI), or an external LLM of your choice
Workflow / coordination (recommend using Workflows, Workers or Durable Objects)
User input via chat or voice (recommend using Pages or Realtime)
Memory or state

explain all of the services i will need to use from cloudflare's cloud to build this full-stack application and how they work
```

**Conclusion**: Pages (Frontend), Workflows (Orchestration), Workers AI (AI Inference), Durable Objects (States/Memory).

### Stateful/Stateless

```
will the application be stateful or stateless for this use case? decide between session tracked via cookies or jwt tokens because both will require different stateful/stateless implementations, stateful might be more costly than stateless but see if its worth keeping state or not
```

**Conclusion**: Stateful (w/ Durable Objects). Chat history and Agentic AI functionality will be limited with stateless implementation. Stateful architecture in this scenario without login can use a session ID (Cookie) per client. Use Durable Objects to store chat history by session ID.

### Workflows requirement w/ MCP

```
i will be using cloudflare's agents sdk, is it possible to give the agent class the mcp server defined, so it can use the tools directly, or is it more complicated than that? will i need workflows to orchestrate the agentic AI workflow still?
```

**Conclusion**: Start off without Workflows since MCP can be used by the Agent without Workflow orchestration. Add workflows is there is time. Workers AI is sufficient for now.

```
can you give an example piece of code for an Agent class defined by cloudflare's agents sdk with mcp server linked to it in the definition, or however it is implemented together. the mcp server will be an endpoint on smithery, not a custom implementation.
```

**Conclusion**: Fairly simple implementation of an Agent class with a remote mcp server on smithery to call a single tool.

```
youre using a hardcoded tool call for the agent, this is not the goal, the agent should autonomously pick which tool in the mcp server to use for the prompt given, if at all be used
```

**Conclusion**: MCP tool listing, passing to Agent to use which tool may be relevant, if relevant use it in response, if not return pure AI generated response.

_Basic code given by Perplexity_:

```ts
import { Agent } from "@cloudflare/agents";
import { RemoteMcpServer } from "@modelcontextprotocol/sdk/server/remote";

// Smithery MCP server endpoint
const SMITHERY_MCP_SERVER_URL = "https://smithery.ai/api/mcp/your-server-id";

export class MyAgent extends Agent {
  mcpServer = new RemoteMcpServer(SMITHERY_MCP_SERVER_URL);

  // Called when a user sends a message
  async onMessage(message: string) {
    // 1. Fetch available tools from the MCP server
    const tools = await this.mcpServer.listTools();

    // 2. Pass the tool schema and user prompt to the LLM
    const llmResponse = await this.callLLM({
      prompt: message,
      tools: tools // Expose all tools to the LLM for autonomous selection
    });

    // 3. If the LLM requests a tool call, execute it
    if (llmResponse.toolCall) {
      const { toolName, args } = llmResponse.toolCall;
      const result = await this.mcpServer.callTool(toolName, args);
      return { reply: result.content[0].text };
    }

    // 4. Otherwise, return the LLM's direct response
    return { reply: llmResponse.text };
  }
}
```

```
where is callLLM defined? its not imported nor defined in the code, is it a part of an import or did you just not implement it?
```

**Conclusion**: callLLM is defined by Agents class imported by Cloudflare's agents SDK.

_Pattern for basic Agentic AI_:

```ts
import { AIChatAgent } from "@cloudflare/agents";
import { RemoteMcpServer } from "@modelcontextprotocol/sdk/server/remote";

const SMITHERY_MCP_SERVER_URL = "https://smithery.ai/api/mcp/your-server-id";

export class MyAgent extends AIChatAgent {
  mcpServer = new RemoteMcpServer(SMITHERY_MCP_SERVER_URL);

  // The SDK handles LLM calls and tool selection internally
  async onChatMessage(message: string) {
    // The agent framework will:
    // 1. Pass the prompt and available tools to the LLM
    // 2. Parse the LLM's response for tool calls
    // 3. Execute the tool call if requested
    // 4. Return the result or the LLM's direct response

    // You only need to define the available tools and handle the result
    return await this.handleMessageWithTools(
      message,
      this.mcpServer.listTools()
    );
  }
}
```

### Research Finalization

```
based on #PROMPTS.md , make an mvp section replacing this with checkboxes and an extended functionality section, this project is an AI anime chat which can retrieve information with agentic AI using cloudflare's cloud services with MCP tool calling functionality in the agent. the core requirements are as given:

- LLM (recommend using Llama 3.3 on Workers AI), or an external LLM of your choice

- Workflow / coordination (recommend using Workflows, Workers or Durable Objects)

- User input via chat or voice (recommend using Pages or Realtime)

- Memory or state



replace the #README.md todo section with your response
```

## Kiro Spec-driven Development Boilerplate Code (Kiro IDE)

```
Create the foundation layer of the client/server model in #src , just a simple server.ts with boiletplate in a server folder and client folder with App.tsx (and Index.tsx) if needed for the react frontend

Just need boilerplate to get started in this environment, make the client and server link to each other through an endpoint or so for testing (w/ html unstyled button)
```

### Requirements

Modify generated requirements.md as per requirements

### Design

Modify generated design.md as per design (architecture)

### Tasks

Modify generated tasks.md if required (in this case no, only had to selected to skip optional tasks, like testing tasks)

### Run tasks one by one

Tasks can be run one by one in tasks.md generated by Kiro.

> [!IMPORTANT]
> Validate every task executed to make sure it is as expected.

**Conclusion**: Kiro did a horrible job and made the boilerplate incredibly complicated, deleted everything and had to make this part myself manually (seems like AI can't do everything!)

## Error handling basic (Kiro IDE)

### Cloudflare workers boilerplate

```
Expected "default" export of "C:\Users\aryan\OneDrive - Thomas More\Internship\assignments\cf-ai-ainme\src\server.ts" to define a `fetch()` function.
```

### React DOM insertion

```
Uncaught Error: Target container is not a DOM element.
    at exports.createRoot (react-dom_client.js?v=233f34af:20110:17)
    at Index.tsx:6:10
```

**Conclusion**: AI made it worse, manually fixed (import statement syntax issue).

### Alias config

```
How do I fix the following problem in the above code?: Cannot find module '@/lib/utils' or its corresponding type declarations.
```

### Tailwind animation

```
[vite] Internal server error: Can't resolve 'tw-animate-css' in 'C:\Users\aryan\OneDrive - Thomas More\Internship\assignments\cf-ai-ainme\src\client'
  Plugin: @tailwindcss/vite:generate:serve
  File: C:/Users/aryan/OneDrive - Thomas More/Internship/assignments/cf-ai-ainme/src/client/index.css
```
