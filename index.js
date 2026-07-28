const express = require("express");
const app = express();
const TARGET = "https://fapi.binance.com";

app.get("/health", (req, res) => res.send("ok"));

app.use(async (req, res) => {
  const url = TARGET + req.originalUrl;
  try {
    const upstream = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const body = await upstream.text();
    res.status(upstream.status);
    res.set("Content-Type", upstream.headers.get("content-type") || "application/json");
    res.send(body);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("relay listening on " + PORT));
