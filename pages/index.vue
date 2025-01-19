<script setup lang="ts">
const { weather, fetchLocalWeather } = useWeatherStore();

await fetchLocalWeather();
</script>

<template>
  <AppSearch />
  <client-only>
    <Weather />
  </client-only>
</template>
