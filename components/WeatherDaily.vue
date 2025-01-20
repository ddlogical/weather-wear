<script setup lang="ts">
import type { DayPeriod, PeriodData } from "~/types/weather";

const { periods } = defineProps<{
  periods: Record<DayPeriod, PeriodData>;
}>();
</script>

<template>
  <v-card class="weather-widget__forecast">
    <div class="d-none d-sm-flex flex-column ga-3 align-self-end">
      <p>Temperature</p>
      <p>Feels Like</p>
      <p>Wind Speed</p>
      <p>Humidity</p>
    </div>
    <div class="d-flex ga-8">
      <WeatherDailyPeriod
        v-for="(value, key) in periods"
        :key="key"
        :periodData="value"
        :periodName="key"
      />
    </div>
  </v-card>
</template>

<style scoped>

.weather-widget__forecast {
  grid-column: 6 / -1;
  grid-row: 1 / 4;
  display: flex;
  padding: .8rem 1rem 2rem;
  gap: 1rem;
  overflow: auto;
}

@media only screen and (max-width: 600px) {

  .weather-widget__forecast {
    grid-column: 1 / -1;
    grid-row: 2 / 4;
    padding: .8rem;
  }


}
</style>
