import { defineStore } from "pinia";
import config from "~/config";
import type { WeatherData, Weather } from "~/types/weather";
import type { City, CityLocal } from "~/types/city";

const {
  API_USER_IP_URL,
  API_USER_LOCATION_URL,
  API_CITIES_URL,
  API_WEATHER_URL,
} = config;

interface WeatherStore {
  weather: Weather | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherStore = {
  weather: null,
  loading: false,
  error: null,
};

export const useWeatherStore = defineStore("weather", {
  state: () => initialState,
  actions: {
    async fetchWeather(place: string) {
      this.loading = true;
      const { data } = await useAsyncData<WeatherData>(place, async () => {
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

      this.weather = {
        name: data.value.city.name,
        forecast: parseWeatherForecast(data.value.list),
      };
      this.loading = false;
    },
    async fetchLocalWeather() {
      this.loading = true;
      const { data, error } = await useAsyncData(
        "local",
        async () => {
          const { ip } = await $fetch<{ ip: string }>(API_USER_IP_URL);
          const { lat, lon } = await $fetch<CityLocal>(
            `${API_USER_LOCATION_URL}/${ip}`
          );
          const weather = await $fetch<any>(API_WEATHER_URL, {
            query: {
              lat: lat,
              lon: lon,
              units: "metric",
            },
          });

          return weather;
        },
        {
          server: false,
        }
      );
      if (data.value) {
        this.weather = {
          name: data.value.city.name,
          forecast: parseWeatherForecast(data.value.list),
        };
        this.loading = false;
      }
    },
  },
});
