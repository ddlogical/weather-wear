<script setup lang="ts">
const { weather, fetchLocalWeather } = useWeatherStore();

await fetchLocalWeather();
console.log(weather?.forecast)
</script>

<template>
  <AppSearch />
</template>
