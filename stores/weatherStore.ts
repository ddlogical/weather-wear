import { defineStore } from "pinia";
import config from "~/config";

const { API_WEATHER_URL } = config;

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weather: null,
    loading: false,
    error: null
  }),
  actions: {
    async fetchWeather() {
      this.loading = true;
      const { data }: any = await useFetch(API_WEATHER_URL, {
        lazy: true
      });
      console.log("DATA!!!", data)
      if (data.value) {
        this.weather = data.value;
        this.loading = false;
      }
    },
    async fetchLocalWeather() {
      this.loading = true;
      const { data }: any = await useFetch(API_WEATHER_URL, {
        lazy: true
      });
      if (data.value) {
        this.weather = data.value;
        this.loading = false;
      }
    },
  },
});