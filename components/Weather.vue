<script setup lang="ts">
const { weather } = useWeatherStore();

const selected = ref<number>(0);

const currentWeather = computed(() => {
  const res = weather?.forecast[selected.value];
  return res;
});
</script>

<template>
  <section class="weather-section">
    <template v-if="weather && currentWeather">
      <h4 class="text-h4 pb-4">{{ weather.name }}</h4>
      <v-slide-group show-arrows="mobile" v-model="selected">
        <CardSwitch
          v-for="(forecast, index) in weather.forecast"
          :key="forecast.date"
          :periods="forecast.periods"
          :today="!index"
        />
      </v-slide-group>
      <WeatherWidget
        :periods="currentWeather.periods"
        :today="selected === 0"
      />
    </template>
  </section>
</template>

<style scoped>
.weather-section {
  margin: 0 auto;
  padding: 0 1rem;
  overflow: hidden;
  max-width: max-content;
  min-height: calc(100dvh - 18rem);
}
</style>
