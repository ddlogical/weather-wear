<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();

const isDarkTheme = computed(() => {
  return theme.global.current.value.dark;
});

  const { switchUnit } = useOptionsStore();
  const switchValue = ref(true);

  watch(switchValue, (newValue) => {
    switchUnit(newValue ? 'celsius' : 'fahrenheit')
  })
</script>


<template>

<v-switch
    v-model="switchValue"
    :label="switchValue ? 'C' : 'F'"
   :color="isDarkTheme ? 'hot' : 'cold'"
    hide-details
    inset
  ></v-switch>

</template>