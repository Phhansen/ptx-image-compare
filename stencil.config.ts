import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import autoprefixer from "autoprefixer";

export const config: Config = {
  namespace: "ptx-image-comparison",
  outputTargets: [
    { type: "dist" },
    { type: "www", serviceWorker: null }
  ],
  plugins: [
    postcss({
      plugins: [autoprefixer()],
      browsers: ['last 3 versions', '> 1%', 'iOS >=7']
    })
  ]
};