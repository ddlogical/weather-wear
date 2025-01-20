<script setup lang="ts">
import type { DayPeriod, PeriodData } from "~/types/weather";
import adwiser from "~/data/adwiser.json";
import { format } from "date-fns";
import config from "~/config";

const { MIN_HOT_TEMP } = config;

const options = useOptionsStore();

const { periods, today } = defineProps<{
  periods: Record<DayPeriod, PeriodData>;
  today: boolean;
}>();

const forecast = computed(() => getCurrentWeather(periods, today));
const weather = computed(() => {
  const [weather] = forecast.value?.weather ?? [];
  return weather;
});
const icons = computed(() => {
  const weatherStatus = weather?.value?.main?.toLowerCase();
  const weatherType = getTemperatureStatus(
    forecast.value?.main?.temp ?? 0,
    MIN_HOT_TEMP
  );
  if (weatherStatus && weatherType) {
    const weatherOptions = adwiser[weatherStatus as keyof typeof adwiser];
    const recommendation = getRandom(
      weatherOptions[weatherType as keyof typeof weatherOptions]
    );
    return recommendation["icons"];
  }
  return [];
});

</script>

<template>
  <v-slide-group-item v-if="forecast" v-slot="{ isSelected, toggle }">
    <v-card
      :class="[isSelected ? 'card-switch--active' : '', 'card-switch', 'ma-2']"
      elevation="1"
      :disabled="isSelected"
      @click="toggle"
    >
      <div class="d-flex flex-column justify-center ga-1">
        <p class="align-self-center">
          {{ format(new Date(forecast?.dt_txt ?? ""), "EEEE") }}
        </p>
        <p>
          <span class="text-h5 el-text-bold">{{
            format(new Date(forecast?.dt_txt ?? ""), "dd")
          }}</span>
          {{ format(new Date(forecast?.dt_txt ?? ""), "LLLL") }}
        </p>
        <div class="d-flex ga-1">
          <ClothIcon
            v-for="(icon, index) in icons"
            :type="icon"
            :key="index"
            :width="25"
            :height="25"
          />
        </div>
      </div>
      <div class="d-flex flex-column align-center">
        <WeatherIcon
          :type="weather?.main?.toLowerCase()"
          :width="50"
          :height="40"
        />
        <p>{{ convertTemperature(forecast?.main?.temp ?? 0, options.unit) }}</p>
        <p class="text-caption">
          {{ convertTemperature(forecast?.main?.feels_like ?? 0, options.unit) }}
        </p>
      </div>
    </v-card>
  </v-slide-group-item>
</template>

<style scoped>
.card-switch {
  display: flex;
  gap: 1rem;
  min-width: 13rem;
  height: 7.5rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

.card-switch--active,
.card-switch:hover {
  scale: 1.04;
  background-color: rgb(var(--v-theme-accent));
}
</style>
