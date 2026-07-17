import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Serves the anyvac-card package root (two levels up from this file) so
// both /dist/anyvac-card.js and /tests/harness/mock-ha.html are reachable.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript" };
const port = process.env.PORT ? Number(process.env.PORT) : 8899;

http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  fs.readFile(p, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found: " + p); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(port, () => console.log(`[harness] serving ${root} on ${port}`));
