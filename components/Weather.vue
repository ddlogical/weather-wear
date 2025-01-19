<script setup lang="ts">
const { weather } = useWeatherStore();

const selected = ref<number>(0);

const currentWeather = computed(() => {
  const res = weather?.forecast[selected.value];
  console.log("RES", res);
  return res;
})


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
      <WeatherWidget :periods="currentWeather.periods" :today="selected === 0" />
    </template>
  </section>
</template>

<style scoped>
.weather-section {
  max-width: 65%;
  margin: 0 auto;
  overflow: hidden;
  min-height: calc(100dvh - 18rem);
}
</style>
