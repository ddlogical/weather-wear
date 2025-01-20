
<template>
  <v-app-bar
    :elevation="0"
    color="background"
    class="px-4 position-relative bg-animated"
  >
    <template v-slot:prepend>
      <AppLogo :width="64" :height="60" />
    </template>
    <v-app-bar-title
      ><h1 class="text-h4 el-centered d-none d-sm-block">
        Weather Wear
      </h1></v-app-bar-title
    >
    <template v-slot:append>
      <div class="d-flex align-center">
        <ThemeToggler />
        <TemperatureSwitch />
      </div>
    </template>
  </v-app-bar>
</template>
