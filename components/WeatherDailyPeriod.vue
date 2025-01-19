<script setup lang="ts">
import type { PeriodData, DayPeriod } from "~/types/weather";

const { periodData } = defineProps<{
  periodData: PeriodData;
  periodName: DayPeriod;
}>();
</script>

<template>
  <div class="d-flex flex-column">
    <p class="text-capitalize text-center">{{ periodName }}</p>
    <div class="d-flex ga-2">
      <div
        v-for="(elem, key) in periodData"
        :key="key"
        class="d-flex flex-column align-center ga-2"
      >
        <p>{{ key }}</p>
        <WeatherIcon :type="getDailyIcon(key)" :width="45" :height="35" />
        <p>{{ convertTemperature(elem?.main?.temp ?? 0, "celsius") }}</p>
        <p>
          {{ convertTemperature(elem?.main?.feels_like ?? 0, "celsius") }}
        </p>
        <p class="pt-1">{{ elem?.wind?.speed }}</p>
        <p class="pt-1">{{ elem?.main?.humidity }}</p>
      </div>
    </div>
  </div>
</template>
