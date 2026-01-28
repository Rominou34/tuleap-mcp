// Type definitions for Tuleap API responses
export interface Project {
  id: number;
  label: string;
  uri: string;
  shortname: string;
  status: string;
}

export interface User {
  id: number;
  username: string;
  real_name: string;
  email: string;
  avatar_url: string;
}

export interface Tracker {
  id: number;
  label: string;
  uri: string;
  project_id: number;
  item_name: string;
}

export interface Artifact {
  id: number;
  title: string;
  uri: string;
  tracker: {
    id: number;
    label: string;
  };
  last_modified_date: string;
}

// Tool response format
export interface ToolResponse {
  [key: string]: unknown;
  content: Array<{
    type: "text";
    text: string;
  }>;
}
