import type { ThemeInstance } from "vuetify";
import config from "~/config";

const { MIN_HOT_TEMP } = config;

export const toggleWeatherTheme = (temp: number, theme: ThemeInstance) => {
  const { value } = theme.global.current;
  if (value.dark) {
    return;
  }
  if (temp > MIN_HOT_TEMP) {
    theme.global.name.value = "light-hot";
    return;
  }
  theme.global.name.value = "light-cold";
};
