<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const isDarkTheme = computed(() => {
  return theme.global.current.value.dark;
});

function toggleTheme() {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
}
</script>

<template>
  <v-btn
    @click="toggleTheme"
    size="large"
    class="text-h6"
    v-tooltip:bottom="'Toggle theme'"
    :color="isDarkTheme ? 'hot' : 'cold'"
    :icon="isDarkTheme ? 'mdi-weather-sunny' : 'mdi-weather-night'"
  ></v-btn>
</template>
