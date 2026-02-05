import { config } from "../config";
import { Project, User, Tracker, Artifact } from "../types";

class TuleapAPI {
  private baseUrl: string;
  private accessKey?: string;
  private username?: string;
  private password?: string;

  constructor() {
    this.baseUrl = config.TULEAP_URL;
    this.accessKey = config.TULEAP_ACCESS_KEY;
    this.username = config.TULEAP_USERNAME;
    this.password = config.TULEAP_PASSWORD;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T | null> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (options.headers) {
      const inputHeaders = new Headers(options.headers);
      inputHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    }

    // Add authentication
    if (this.accessKey) {
      headers["X-Auth-AccessKey"] = this.accessKey;
    } else if (this.username && this.password) {
      const credentials = Buffer.from(
        `${this.username}:${this.password}`,
      ).toString("base64");
      headers["Authorization"] = `Basic ${credentials}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`,
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error("Error making Tuleap request:", error, {
        url,
        options,
        headers,
      });
      return null;
    }
  }

  // Get user's projects
  async getProjects(): Promise<Project[] | null> {
    return this.makeRequest<Project[]>("/projects");
  }

  // Get project trackers
  async getTrackers(projectId: number): Promise<Tracker[] | null> {
    return this.makeRequest<Tracker[]>(`/projects/${projectId}/trackers`);
  }

  // Get artifacts
  async getArtifacts(
    trackerId: number,
    limit: number = 50,
  ): Promise<Artifact[] | null> {
    return this.makeRequest<Artifact[]>(
      `/trackers/${trackerId}/artifacts?limit=${limit}`,
    );
  }

  // Get single artifact by ID
  async getArtifact(artifactId: number): Promise<Artifact | null> {
    return this.makeRequest<Artifact>(`/artifacts/${artifactId}`);
  }

  // Get current user information
  async getCurrentUser(): Promise<User | null> {
    return this.makeRequest<User>("/users/me");
  }
}

// Export a singleton instance
export const tuleapAPI = new TuleapAPI();
