import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(compression());
app.use(express.json({ limit: "1mb" }));

const ipAccounts = new Map<string, { count: number; lastReset: number }>();
const RATELIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 40;

const apiLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = ((req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1")
    .split(",")[0]
    .trim();
  const now = Date.now();
  const record = ipAccounts.get(ip);

  if (!record || now - record.lastReset > RATELIMIT_WINDOW) {
    ipAccounts.set(ip, { count: 1, lastReset: now });
    return next();
  }

  record.count++;
  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please try again in a minute.",
      retryAfter: Math.round((RATELIMIT_WINDOW - (now - record.lastReset)) / 1000),
    });
  }

  next();
};

setInterval(() => {
  const now = Date.now();
  for (const [ip, value] of ipAccounts.entries()) {
    if (now - value.lastReset > RATELIMIT_WINDOW) {
      ipAccounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

app.use("/api/prompt/", apiLimiter);
app.use("/api/contact/", apiLimiter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "healthy", aiProvider: "disabled" });
});

app.post("/api/prompt/optimize", (req, res) => {
  const { prompt, category } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({ error: "Please enter a valid prompt." });
  }

  const cleanPrompt = prompt.trim();
  const selectedCategory = typeof category === "string" && category.trim() ? category.trim() : "General";
  const optimizedPrompt = [
    `Role: Act as a senior expert for ${selectedCategory}.`,
    "Goal: Produce a clear, useful, and structured answer.",
    "Context:",
    cleanPrompt,
    "Requirements:",
    "- Ask for missing details only when necessary.",
    "- Keep the response practical and specific.",
    "- Use clear sections and examples when helpful.",
    "- Avoid unsupported claims.",
    "Output format:",
    "- Summary",
    "- Recommended approach",
    "- Final answer",
  ].join("\n");

  res.json({
    optimizedPrompt,
    explanation:
      "Gemini is disabled in this project, so this local fallback rewrites the prompt into a structured prompt-engineering format without calling any external API.",
    originalResult:
      "AI simulation is disabled because no external API key is configured. The app is running locally without Gemini.",
    optimizedResult:
      "Use the optimized prompt above with any AI model manually, or keep the project fully local with this fallback response.",
  });
});

app.post("/api/contact/agent", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: "Name and message are required." });
  }

  res.json({
    agentResponse: `سلام ${name} عزیز، پیام شما دریافت شد. این نسخه بدون Gemini API اجرا می‌شود، بنابراین پاسخ خودکار به صورت محلی ساخته شده است. محمدرضا می‌تواند از طریق ${email || "اطلاعات تماس ثبت‌شده"} پیگیری کند.`,
  });
});

const setupStaticAndRouting = async () => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in Development Mode (Vite Middleware)");
    // Serve local PDF files with inline disposition before Vite middleware
    app.get(/\.pdf$/i, (req, res, next) => {
      try {
        // Decode URL component in case filenames contain spaces or encoded chars
        const reqPath = decodeURIComponent(req.path.replace(/^\//, ''));
        // Check both project root and public/ directory where PDFs are stored
        const candidates = [
          path.join(process.cwd(), reqPath),
          path.join(process.cwd(), 'public', reqPath),
        ];

        for (const pdfPath of candidates) {
          if (fs.existsSync(pdfPath)) {
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Content-Type', 'application/pdf');
            return res.sendFile(pdfPath);
          }
        }
      } catch (err) {
        // fall through to vite middleware
      }
      return next();
    });

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in Production Mode (Serving Statics)");
    const distPath = path.join(process.cwd(), "dist");

    app.use(
      express.static(distPath, {
        maxAge: "1h",
        setHeaders: (res, filepath) => {
          // Serve PDFs inline instead of as attachments so "View Online" opens them in-browser
          if (filepath.endsWith('.pdf')) {
            res.setHeader('Content-Disposition', 'inline');
            res.setHeader('Content-Type', 'application/pdf');
          }
          if (filepath.includes("/assets/") || filepath.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
            res.setHeader("X-Content-Type-Options", "nosniff");
          } else if (filepath.endsWith("index.html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
          }
        },
      }),
    );

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"), {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
};

setupStaticAndRouting().catch((err) => {
  console.error("Failed to start server:", err);
});
