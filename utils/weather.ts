import type { ThemeInstance } from "vuetify";
import config from "~/config";
import type {
  DayPeriod,
  PeriodData,
  WeatherForecast,
  ParsedWeatherForecast,
} from "~/types/weather";

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

export const parseWeatherForecast = (
  forecast: WeatherForecast[]
): ParsedWeatherForecast[] => {
  const periods: Record<DayPeriod, string[]> = {
    night: ["00:00", "03:00"],
    morning: ["06:00", "09:00"],
    day: ["12:00", "15:00"],
    evening: ["18:00", "21:00"],
  };
  return Object.entries(
    forecast.reduce<Record<string, Record<DayPeriod, PeriodData>>>(
      (result, entry) => {
        const [date, time] = entry.dt_txt.split(" ");
        const hour = time.substring(0, time.lastIndexOf(":"));

        if (!result[date]) {
          result[date] = {
            night: { "00:00": null, "03:00": null },
            morning: { "06:00": null, "09:00": null },
            day: { "12:00": null, "15:00": null },
            evening: { "18:00": null, "21:00": null },
          };
        }

        for (const [period, hours] of Object.entries(periods) as [
          DayPeriod,
          string[]
        ][]) {
       
          if (hours.includes(hour)) {
            result[date][period][hour] = entry;
            break;
          }
        }

        return result;
      },
      {}
    )
  ).map(([date, periods]) => ({ date, periods }));
};
