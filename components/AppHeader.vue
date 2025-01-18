<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
const temp = ref(0);

const toggleTemp = () => {
  if (temp.value > 10) {
    console.log("HERE HOT", temp.value);
    temp.value = -10;
  } else {
    console.log("HERE COLD", temp.value);
    temp.value = 20;
  }
};

watch(temp, (newValue) => {
  toggleWeatherTheme(newValue, theme)
})
</script>

<template>
  <v-app-bar :elevation="1" color="background" class="px-4 bg-animated">
    <template v-slot:prepend>
      <AppLogo :width="90" :height="50" />
    </template>
    <v-app-bar-title class="text-center text-h4">Weather Wear</v-app-bar-title>
    <template v-slot:append>
      <ThemeToggler />
      <v-btn @click="toggleTemp">Toggle</v-btn>
    </template>
  </v-app-bar>
</template>
