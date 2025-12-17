import 'dotenv/config';
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Parse JSON bodies
  app.use(express.json());

  // HeyGen Access Token API endpoint
  app.post("/api/get-access-token", async (_req, res) => {
    try {
      const apiKey = process.env.VITE_HEYGEN_API_KEY;
      if (!apiKey) {
        return res.status(500).send("HeyGen API key not configured");
      }

      const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
      });

      const data = await response.json();
      if (data.data && data.data.token) {
        res.send(data.data.token);
      } else {
        res.status(500).send("Failed to get access token");
      }
    } catch (error) {
      console.error("Error fetching access token:", error);
      res.status(500).send("Internal server error");
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
