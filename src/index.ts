import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { config } from "./config";
import { getProjectsTool } from "./tools/getProjects";
import { getTrackersTool } from "./tools/getTrackers";
import { getArtifactsTool } from "./tools/getArtifacts";
import { getCurrentUserTool } from "./tools/getCurrentUser";

console.error("Tuleap MCP Server - Initialization started");
console.error("Config loaded:", JSON.stringify(config, null, 2));

// Create server instance
console.error("Creating server instance...");
const server = new McpServer({
  name: "tuleap",
  version: "1.0.0",
});

console.error("Server instance created successfully");

// Register all Tuleap API tools
console.error("Registering tools...");
try {
  server.registerTool(
    getProjectsTool.name,
    getProjectsTool.options,
    getProjectsTool.handler,
  );
  console.error("✓ get-projects tool registered");

  server.registerTool(
    getTrackersTool.name,
    getTrackersTool.options,
    getTrackersTool.handler,
  );
  console.error("✓ get-trackers tool registered");

  server.registerTool(
    getArtifactsTool.name,
    getArtifactsTool.options,
    getArtifactsTool.handler,
  );
  console.error("✓ get-artifacts tool registered");

  server.registerTool(
    getCurrentUserTool.name,
    getCurrentUserTool.options,
    getCurrentUserTool.handler,
  );
  console.error("✓ get-current-user tool registered");

  console.error("All tools registered successfully");
} catch (error) {
  console.error("Error registering tools:", error);
  process.exit(1);
}

// Start the server
async function main() {
  try {
    console.error("Creating StdioServerTransport...");
    const transport = new StdioServerTransport();
    console.error("StdioServerTransport created successfully");

    console.error("Connecting server to transport...");
    await server.connect(transport);
    console.error("Tuleap MCP Server running on stdio");
  } catch (error) {
    console.error("Fatal error in main():", error);
    if (error instanceof Error) {
      console.error("Error stack:", error.stack);
    }
    process.exit(1);
  }
}

console.error("Calling main()...");
main();
