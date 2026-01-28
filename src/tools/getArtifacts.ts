import { z } from "zod";
import { tuleapAPI } from "../api/TuleapAPI";
import { ToolResponse } from "../types";

export const getArtifactsTool = {
  name: "get-artifacts",
  options: {
    title: "Get Artifacts",
    description: "Get artifacts from a specific tracker",
    inputSchema: {
      trackerId: z
        .number()
        .int()
        .positive()
        .describe("ID of the tracker to get artifacts from"),
      limit: z
        .number()
        .int()
        .positive()
        .default(50)
        .describe("Maximum number of artifacts to retrieve"),
    },
  },
  handler: async ({ trackerId, limit }: any): Promise<ToolResponse> => {
    const itemsData = await tuleapAPI.getArtifacts(trackerId, limit);

    if (!itemsData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve artifacts data. Check your authentication settings or tracker ID.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(itemsData, null, 2),
        },
      ],
    };
  },
};
