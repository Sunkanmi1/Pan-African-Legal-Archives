import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

import handler from "./client/dist/server/server.js";

const port = Number(process.env.PORT ?? 8080);
const host = process.env.HOST ?? "0.0.0.0";
const staticDir = fileURLToPath(new URL("./client/dist/client/", import.meta.url));

const MIME_TYPES = {
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

function requestHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers)
      .filter(([, value]) => value !== undefined)
      .map(([name, value]) => [name, Array.isArray(value) ? value.join(", ") : value]),
  );
}

async function tryServeStatic(pathname) {
  // Only attempt for paths that look like files
  if (!extname(pathname) && !pathname.startsWith("/assets/")) return null;

  // Prevent path traversal
  const safePath = normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(staticDir, safePath);
  if (!filePath.startsWith(staticDir)) return null;
  if (!existsSync(filePath)) return null;

  const content = await readFile(filePath);
  const ext = extname(pathname).toLowerCase();
  const mime = MIME_TYPES[ext] ?? "application/octet-stream";
  const isHashed = /\.[a-zA-Z0-9_-]{8,}\.(js|css|woff2?|png|jpe?g|svg|webp)$/.test(pathname);

  return {
    content,
    mime,
    cacheControl: isHashed
      ? "public, max-age=31536000, immutable"
      : "public, max-age=3600",
  };
}

const server = createServer(async (incoming, outgoing) => {
  try {
    const protocol = incoming.headers["x-forwarded-proto"] ?? "http";
    const url = new URL(
      incoming.url ?? "/",
      `${protocol}://${incoming.headers.host ?? `${host}:${port}`}`,
    );
    const method = incoming.method ?? "GET";

    // 1) Try static files first (JS/CSS/images/fonts)
    if (method === "GET" || method === "HEAD") {
      const staticFile = await tryServeStatic(url.pathname);
      if (staticFile) {
        outgoing.statusCode = 200;
        outgoing.setHeader("Content-Type", staticFile.mime);
        outgoing.setHeader("Cache-Control", staticFile.cacheControl);
        if (method === "HEAD") {
          outgoing.end();
        } else {
          outgoing.end(staticFile.content);
        }
        return;
      }
    }

    // 2) Fall through to SSR handler for HTML / API routes
    const request = new Request(url, {
      method,
      headers: requestHeaders(incoming.headers),
      body: method === "GET" || method === "HEAD" ? undefined : incoming,
      duplex: "half",
    });
    const response = await handler.fetch(request, process.env, {});

    outgoing.statusCode = response.status;
    response.headers.forEach((value, name) => outgoing.setHeader(name, value));
    if (method === "HEAD" || !response.body) {
      outgoing.end();
      return;
    }
    Readable.fromWeb(response.body).pipe(outgoing);
  } catch (error) {
    console.error(error);
    outgoing.statusCode = 500;
    outgoing.end("Internal Server Error");
  }
});

server.listen(port, host, () => {
  console.log(`PALA frontend listening on ${host}:${port}`);
});