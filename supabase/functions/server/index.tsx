import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Portfolio Data
app.get("/make-server-4d3a4360/portfolio", async (c) => {
  try {
    const portfolio = await kv.get("portfolio_stats");
    if (!portfolio) {
      // Seed default data if none exists
      const defaultData = {
        valuation: "7,24,50,000",
        change: "+ ₹ 1,24,500 (+1.75%)",
        health: "8.5/10",
        personality: "Balanced",
        xirr: "24.5%",
        sharpe: "1.8",
        winRate: "65%"
      };
      await kv.set("portfolio_stats", defaultData);
      return c.json(defaultData);
    }
    return c.json(portfolio);
  } catch (err) {
    console.error("Error fetching portfolio stats:", err);
    return c.json({ error: "Failed to fetch portfolio data" }, 500);
  }
});

// AI Chat Interaction
app.post("/make-server-4d3a4360/chat", async (c) => {
  try {
    const { message } = await c.req.json();
    
    // Simulate AI response logic
    let response = "I'm analyzing your request regarding wealth intelligence. Currently, your portfolio balance looks optimized for the current quarter.";
    
    if (message.toLowerCase().includes("rebalance")) {
      response = "Rebalancing analysis initiated. Moving 5% from large-cap indices to emerging tech sectors could improve your XIRR by 1.2% while maintaining your Sharpe Ratio of 1.8.";
    } else if (message.toLowerCase().includes("risk")) {
      response = "Your current risk exposure is within 'Balanced' parameters. Volatility in the energy sector is being hedged by your recent bond allocations.";
    }

    return c.json({ response });
  } catch (err) {
    console.error("Error in AI chat:", err);
    return c.json({ error: "Intelligence system temporarily offline" }, 500);
  }
});

// Health check endpoint
app.get("/make-server-4d3a4360/health", (c) => {
  return c.json({ status: "ok" });
});

Deno.serve(app.fetch);
