import { z } from "zod";
import { tuleapAPI } from "../api/TuleapAPI";
import { ToolResponse } from "../types";

export const getArtifactTool = {
  name: "get-artifact",
  options: {
    title: "Get Artifact",
    description: "Get details of a specific artifact by its ID",
    inputSchema: {
      artifactId: z
        .number()
        .int()
        .positive()
        .describe("ID of the artifact to retrieve"),
    },
  },
  handler: async ({ artifactId }: { artifactId: number }): Promise<ToolResponse> => {
    const artifact = await tuleapAPI.getArtifact(artifactId);

    if (!artifact) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve artifact. Check your authentication settings or verify the artifact ID exists.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(artifact, null, 2),
        },
      ],
    };
  },
};
