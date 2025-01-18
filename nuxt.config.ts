import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    //...
  ],
  pinia: {
    storesDirs: ['./store/index.ts'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
