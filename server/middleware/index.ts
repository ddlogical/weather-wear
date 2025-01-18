import { joinURL } from "ufo";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  if (event.path.startsWith("/api/weather")) {
    const proxyUrl = config.weatherApiUrl;
    const weatherApiKey = config.weatherApiKey;
    const path = event.path.replace(/^\/api\/weather/, "");
    const target = joinURL(proxyUrl, path);
    const { searchParams } = new URL(target);
    searchParams.append("appid", weatherApiKey);
    const data = await $fetch(`${target}?${searchParams}`, {
      cache: "no-store",
    });
    return data;
  }
  if (event.path.startsWith("/api/cities")) {
    const proxyUrl = config.citiesApiUrl;
    const citiesApiKey = config.citiesApiKey;
    const path = event.path.replace(/^\/api\/cities/, "");
    const target = joinURL(proxyUrl, path);

    // searchParams.append("appid", weatherApiKey);
    const data = await $fetch(target, {
      headers: {
        "x-rapidapi-key": citiesApiKey,
      },
      cache: "no-store",
    });
    return data;
    // return proxyRequest(event, target);
  }
});
