<script setup lang="ts">
import { format } from "date-fns";
import config from "~/config";
import adwiser from "~/data/adwiser.json";
import type { DayPeriod, PeriodData } from "~/types/weather";
import WeatherDaily from "./WeatherDaily.vue";

const { MIN_HOT_TEMP } = config;
const { periods, today } = defineProps<{
  periods: Record<DayPeriod, PeriodData>;
  today: boolean;
}>();

const options = useOptionsStore();

const forecast = computed(() => getCurrentWeather(periods, today));
const weather = computed(() => {
  const [weather] = forecast.value?.weather ?? [];
  return weather;
});
const icons = computed(() => {
  const weatherStatus = weather?.value.main?.toLowerCase();
  const weatherType = getTemperatureStatus(
    forecast.value?.main?.temp ?? 0,
    MIN_HOT_TEMP
  );
  if (weatherStatus && weatherType) {
    const weatherOptions = adwiser[weatherStatus as keyof typeof adwiser];
    const adwice = getRandom(
      weatherOptions[weatherType as keyof typeof weatherOptions]
    );
    return adwice["icons"];
  }
  return [];
});
const adwice = computed(() => {
  const weatherStatus = weather?.value.main?.toLowerCase();
  const weatherType = getTemperatureStatus(
    forecast.value?.main?.temp ?? 0,
    MIN_HOT_TEMP
  );
  if (weatherStatus && weatherType) {
    const weatherOptions = adwiser[weatherStatus as keyof typeof adwiser];
    const adwice = getRandom(
      weatherOptions[weatherType as keyof typeof weatherOptions]
    );
    return adwice["recommendation"];
  }
  return [];
});
</script>

<template>
  <div class="weather-widget">
    <div class="weather-widget__common">
      <div>
        <p v-if="today" class="text-h5">Today</p>
        <p>
          <span class="text-h5 el-text-bold">{{
            format(new Date(forecast?.dt_txt ?? ""), "dd")
          }}</span>
          {{ format(new Date(forecast?.dt_txt ?? ""), "LLLL") }}
        </p>
        <p>{{ format(new Date(forecast?.dt_txt ?? ""), "EEEE") }}</p>
      </div>

      <div class="d-flex flex-column align-center">
        <WeatherIcon
          :type="weather?.main?.toLowerCase()"
          :width="200"
          :height="150"
        />
      </div>
      <p class="text-h5 text-center el-text-bold">
        {{ convertTemperature(forecast?.main?.temp ?? 0, options.unit) }}
      </p>
      <p class="text-h6 d-none d-sm-block">
        Feels like:
        {{ convertTemperature(forecast?.main?.feels_like ?? 0, options.unit) }}
      </p>
      <p class="text-capitalize d-none d-sm-block">
        {{ weather?.description }}
      </p>
    </div>

    <WeatherDaily :periods="periods" />

    <v-card class="weather-widget__cloth d-sm-flex" elevation="2">
      <ClothIcon
        v-for="(icon, index) in icons"
        :type="icon"
        :key="index"
        :width="80"
        :height="80"
      />
    </v-card>

    <v-card class="weather-widget__adwices" elevation="2">
      <p class="text-h5 text-center">Clothing recommendations</p>
      <p>{{ adwice }}</p>
    </v-card>
  </div>
</template>

<style scoped>

.weather-widget {
  display: grid;
  padding: 1rem;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-rows: repeat(6, 80px);
  grid-template-columns: repeat(12, minmax(auto, 80px));
  justify-content: center;
}

.weather-widget__common {
  grid-column: 1 / 6;
  grid-row: 1 / 5;
  padding: 5px;
}

.weather-widget__cloth {
  grid-column: 1 / 6;
  grid-row: 5 / 7;
  padding: 1rem;
  display: none;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.weather-widget__adwices {
  grid-column: 6 / -1;
  grid-row: 4 / -1;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  overflow: auto;
}

@media only screen and (max-width: 600px) {
  .weather-widget {
    row-gap: 2rem;
  }

  .weather-widget__common {
    display: flex;
    flex-direction: row;
    align-items: center;
    grid-column: 1 / -1;
    grid-row: 1 / 2;
  }

  .weather-widget__adwices {
  grid-column: 1 / -1;
  grid-row: 4 / -1;
}
}
</style>
