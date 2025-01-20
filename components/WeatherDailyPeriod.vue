<script setup lang="ts">
import type { PeriodData, DayPeriod } from "~/types/weather";

const { periodData } = defineProps<{
  periodData: PeriodData;
  periodName: DayPeriod;
}>();

const options = useOptionsStore();

const isVisible = computed(() => Object.values(periodData).some(el => el));

</script>

<template>
  <div v-if="isVisible" class="d-flex flex-column">
    <p class="text-capitalize text-center">{{ periodName }}</p>
    <div class="d-flex ga-2">
      <template    v-for="(elem, key) in periodData"
      :key="key">
      <div
        v-if="elem"
        class="d-flex flex-column align-center ga-2"
      >
        <p>{{ key }}</p>
        <WeatherIcon :type="getDailyIcon(key)" :width="45" :height="35" />
        <p>{{ convertTemperature(elem?.main?.temp ?? 0, options.unit) }}</p>
        <p>
          {{ convertTemperature(elem?.main?.feels_like ?? 0, options.unit) }}
        </p>
        <p class="pt-1 d-none d-sm-block">{{ elem?.wind?.speed }}</p>
        <p class="pt-1 d-none d-sm-block">{{ elem?.main?.humidity }}</p>
      </div>
      </template>

    </div>
  </div>
</template>
