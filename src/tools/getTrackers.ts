import { z } from "zod";
import { tuleapAPI } from "../api/TuleapAPI";
import { ToolResponse } from "../types";

export const getTrackersTool = {
  name: "get-trackers",
  options: {
    title: "Get Project Trackers",
    description: "Get trackers for a specific project",
    inputSchema: {
      projectId: z
        .number()
        .int()
        .positive()
        .describe("ID of the project to get trackers from"),
    },
  },
  handler: async ({ projectId }: any): Promise<ToolResponse> => {
    const trackersData = await tuleapAPI.getTrackers(projectId);

    if (!trackersData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve trackers data. Check your authentication settings or project ID.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(trackersData, null, 2),
        },
      ],
    };
  },
};
