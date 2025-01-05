// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

import netlify from "@astrojs/netlify";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), db(), react()],
  adapter: netlify(),
  output: "server",
});
