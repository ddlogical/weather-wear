<script setup lang="ts">
const { searchValue, searchItems, searchItemsLoading, debouncedSearch } =
  useSearch();


</script>

<template>
  <section class="pt-10 pb-2 px-2">
    <v-row justify="center" dense>
      <v-autocomplete
        :items="searchItems"
        class="mx-auto"
        density="comfortable"
        no-filter
        menu-icon=""
        placeholder="Enter your current location"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 600px"
        variant="solo"
        auto-select-first
        @update:search="debouncedSearch"
        item-props
        v-model="searchValue"
        rounded
      >
        <template v-if="searchItemsLoading" #append-inner>
          <v-progress-circular
            indeterminate
            color="primary"
            size="24"
          ></v-progress-circular>
        </template>
      </v-autocomplete>
    </v-row>
  </section>
</template>
