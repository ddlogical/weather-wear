import { defineStore } from "pinia";
import config from "~/config";
import type { City, CityLocal } from "~/types/city";

const { API_USER_IP_URL, API_USER_LOCATION_URL, API_CITIES_URL, API_WEATHER_URL } = config;

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weather: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchWeather(place: string) {
      this.loading = true;
      // `${place}-${Date.now()}`
      const { data } = await useAsyncData(place, async () => {
        const [placeData] = await $fetch<City[]>(API_CITIES_URL, {
          query: {
            namePrefix: place,
            limit: 1,
          },
        });
        const { latitude, longitude } = placeData;
        const weather = await $fetch<any>(API_WEATHER_URL, {
          query: {
            lat: latitude,
            lon: longitude,
            units: "metric",
          },
        });

        return weather;
      });

      if (!data.value) {
        throw createError({
          statusCode: 404,
          statusMessage: "Page Not Found",
        });
      }

      this.weather = data.value;
      this.loading = false;
    },
    async fetchLocalWeather() {
      this.loading = true;
      const { data, error } = await useAsyncData('local', async () => {
        const { ip } = await $fetch<{ip: string}>(API_USER_IP_URL);
        const {lat, lon} = await $fetch<CityLocal>(`${API_USER_LOCATION_URL}/${ip}`);
        const weather = await $fetch<any>(API_WEATHER_URL, {
          query: {
            lat: lat,
            lon: lon,
            units: "metric",
          },
        });

        return weather;
      }, {
        server: false
      });
      if (data.value) {
        this.weather = data.value;
        this.loading = false;
      }
    },
  },
});
