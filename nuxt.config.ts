import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@pinia/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    weatherApiUrl: 'https://api.openweathermap.org/data/2.5/forecast',
    citiesApiUrl: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    // JUST FOR TEST PURPOSES (I REALISE IT'S NOT SECURE, STORE THESE KEYS IN PUBLIC REPO)
    weatherApiKey: '35e52c5438f7b9bb65c61b43c5b9ce5c',
    citiesApiKey: '5af57e12f0msh31aa71057c4e076p174952jsnfbe9b9b7d888'
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
