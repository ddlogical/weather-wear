<script setup lang="ts">
import config from "~/config";
import type { City } from "~/types/city";

const { API_CITIES_URL } = config;

const route = useRoute();
const { weather, fetchWeather } = useWeatherStore();
const slug = computed(() => {
  const slugData = route.params.slug;
  if (Array.isArray(slugData)) {
    const [placeSlug] = slugData;
    return placeSlug;
  }
  return slugData;
});
await fetchWeather(slug.value);

</script>

<template>
  <AppSearch />
</template>
