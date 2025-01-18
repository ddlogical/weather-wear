import config from "~/config";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import type { City } from "~/types/city";

const { API_CITIES_URL } = config;

export function useSearch() {
  const searchValue = ref(null);
  const searchedValue = ref("");

  const { data: fetchedItems, status } = useFetch<{data: City[]}>(API_CITIES_URL, {
    query: {
      namePrefix: searchedValue,
      limit: 5,
    },
    watch: [searchedValue],
    immediate: false,
  });

  const searchItemsLoading = computed(() => status.value === 'pending')

  const searchItems = computed(() => {
    const items = fetchedItems.value?.data;
    if(items && items.length) {
      return items.map(el => ({id: el.id, title: el.name,  prependIcon: 'mdi-map-marker-outline'}))
    }
    return []
  })

  const debouncedSearch = debounce((newValue: string) => {
    if (newValue) {
      if (/[^a-zA-Z0-9\s]/.test(newValue)) {
        searchedValue.value = cyrillicToTranslit().transform(newValue);
      } else {
        searchedValue.value = newValue;
      }
    }
  }, 1000);

  watch(searchValue, (newValue) => {
    console.log("SELECTED VALUE", newValue);
  })

  return {
    searchValue,
    searchItems,
    searchItemsLoading,
    debouncedSearch,
  };
}
