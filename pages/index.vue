<script setup lang="ts">
const { weather, fetchLocalWeather } = useWeatherStore();
// await fetchWeather();
await fetchLocalWeather();
// console.log(weather)
</script>

<template>
  <AppSearch />
</template>
