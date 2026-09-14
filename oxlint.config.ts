import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import { jsPluginSettings, selectJsPlugins } from "ultracite/oxlint/js-plugins";
import next from "ultracite/oxlint/next";
import nextJsPlugins from "ultracite/oxlint/next/js-plugins";
import react from "ultracite/oxlint/react";
import vitest from "ultracite/oxlint/vitest";

const jsPlugins = selectJsPlugins(["react-doctor"]);

export default defineConfig({
  extends: [core, react, next, vitest, nextJsPlugins, antiSlop, jsPlugins],
  ignorePatterns: [
    ...(Array.isArray(core.ignorePatterns) ? core.ignorePatterns : []),
    ".cursor/**",
  ],
  jsPlugins: jsPlugins.jsPlugins,
  overrides: [
    {
      files: ["**/*.test.ts"],
      rules: {
        "anti-slop/no-chained-type-assertions": "off",
        "anti-slop/require-safety-comment-for-type-assertion": "off",
      },
    },
  ],
  settings: jsPluginSettings,
});
