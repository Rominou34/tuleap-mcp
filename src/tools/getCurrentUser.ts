import { z } from "zod";
import { tuleapAPI } from "../api/TuleapAPI";
import { ToolResponse } from "../types";

export const getCurrentUserTool = {
  name: "get-current-user",
  options: {
    title: "Get Current User",
    description: "Get information about the currently authenticated user",
    inputSchema: {},
  },
  handler: async (): Promise<ToolResponse> => {
    const userData = await tuleapAPI.getCurrentUser();

    if (!userData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve user information. Check your authentication settings.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(userData, null, 2),
        },
      ],
    };
  },
};
