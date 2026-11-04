import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Absolute site URL for link previews (WhatsApp needs a full og:image URL).
// Set SITE_URL for a custom domain; on Vercel the production URL is picked up automatically.
const vercelUrl = process.env["VERCEL_PROJECT_PRODUCTION_URL"];
const siteUrl = process.env["SITE_URL"] ?? (vercelUrl ? `https://${vercelUrl}` : "");

export default defineConfig(({ command }) => ({
  define: {
    __SITE_URL__: JSON.stringify(siteUrl.replace(/\/$/, "")),
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      // nitro/vite builds from this
      server: { entry: "server" },
    }),
    // Deploy adapter, build only. Writes .vercel/output, which Vercel deploys as-is.
    ...(command === "build" ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: { host: "::", port: 8080 },
}));
