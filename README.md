# Tuleap MCP

Model Context Protocol (MCP) server for [Tuleap](https://www.tuleap.com/) projects.

## Installation

Prerequisite: You need to have [Node.js](https://nodejs.org/) (v16 or later) and npm installed.

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd tuleap-mcp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your Tuleap credentials by copying `.env.example` to `.env` and filling in the required values.

## Tools

Run the dev server:

```bash
npm run dev
```

### Available Tools

| Tool Name        | Description                                                 | Parameters                                |
| ---------------- | ----------------------------------------------------------- | ----------------------------------------- |
| get-current-user | Get information about the currently authenticated user      | None                                      |
| get-projects     | Get a list of projects the authenticated user has access to | None                                      |
| get-trackers     | Get trackers for a specific project                         | projectId (int)                           |
| get-artifacts    | Get artifacts from a specific tracker                       | trackerId (int), limit (int, default: 50) |

## Configuration

Example `mcp.json` configuration:

```json
{
  "mcpServers": {
    "tuleap-mcp": {
      "command": "npm",
      "args": ["run", "dev:server"],
      "cwd": "path/to/tuleap-mcp"
    }
  }
}
```

## MCP Inspector

To run with MCP inspector during development:

```bash
npm run dev:inspector
```

Or for automatic reloading:

```bash
npm run dev
```

## Dependencies

- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk) - MCP SDK for Node.js
- [dotenv](https://github.com/motdotla/dotenv) - Environment variable management
- [zod](https://github.com/colinhacks/zod) - Type validation and schema declaration

## Build

To build the TypeScript code to JavaScript:

```bash
npm run build
```

## Start Production Server

```bash
npm start
```
