import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Configuration schema for validation
const configSchema = z.object({
  TULEAP_URL: z.string().url().default("https://tuleap.net/api"),
  TULEAP_ACCESS_KEY: z.string().optional(),
  TULEAP_USERNAME: z.string().optional(),
  TULEAP_PASSWORD: z.string().optional(),
});

// Validate and parse configuration
const config = configSchema.parse(process.env);

// Validate authentication method
if (
  !config.TULEAP_ACCESS_KEY &&
  (!config.TULEAP_USERNAME || !config.TULEAP_PASSWORD)
) {
  throw new Error(
    "Either TULEAP_ACCESS_KEY or both TULEAP_USERNAME and TULEAP_PASSWORD must be provided",
  );
}

export { config };
