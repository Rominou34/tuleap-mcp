import { z } from "zod";
import { tuleapAPI } from "../api/TuleapAPI";
import { ToolResponse } from "../types";

export const getProjectsTool = {
  name: "get-projects",
  options: {
    title: "Get User Projects",
    description: "Get a list of projects the authenticated user has access to",
    inputSchema: {},
  },
  handler: async (): Promise<ToolResponse> => {
    const projectsData = await tuleapAPI.getProjects();

    if (!projectsData) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve projects data. Check your authentication settings.",
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(projectsData, null, 2),
        },
      ],
    };
  },
};
