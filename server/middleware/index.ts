import { joinURL } from "ufo";
import { City } from "~/types/city";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (event.path.startsWith("/api/weather")) {
    const proxyUrl = config.weatherApiUrl;
    const weatherApiKey = config.weatherApiKey;
    const path = event.path.replace(/^\/api\/weather/, "");
    const target = joinURL(proxyUrl, path);
    const { searchParams } = new URL(target);
    searchParams.append("appid", weatherApiKey);
    const data = await $fetch(`${target}?${searchParams}`);
    return data;
  }
  if(event.path.startsWith("/api/location")) {
    const proxyUrl = config.locationApiUrl;
    const path = event.path.replace(/^\/api\/location/, "");
    const target = joinURL(proxyUrl, path);
    const data = await $fetch(target);
    return data;
  }
  if (event.path.startsWith("/api/cities")) {
    const proxyUrl = config.citiesApiUrl;
    const citiesApiKey = config.citiesApiKey;
    const path = event.path.replace(/^\/api\/cities/, "");
    const target = joinURL(proxyUrl, path);

    const { data } = await $fetch<Promise<{data: City}>>(target, {
      headers: {
        "x-rapidapi-key": citiesApiKey,
      },
    });
    return data;
  }
});
