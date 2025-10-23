import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// pastikan dotenv diarahkan ke root
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("SUPABASE_URL:", supabaseUrl);
  console.error("SUPABASE_KEY:", supabaseKey ? "Loaded" : "Missing");
  throw new Error("Missing Supabase configuration. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
