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
  const periods = {
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


export const getCurrentWeather = (data: Record<DayPeriod, PeriodData>, today: boolean): WeatherForecast | null => {
  const periodsOrder = ["night", "morning", "day", "evening"];
  if(!today) return data.day['12:00'];

  for (const period of periodsOrder) {
    const times = data[period as keyof typeof data];
    if (times) {
      for (const time in times) {
        if (times[time as keyof typeof times]) {
          return times[time as keyof typeof times];
        }
      }
    }
  }

  return null;
};

export const getTemperatureStatus = (temperatureKelvin: number, temperatureCelsius: number): string => {
  return temperatureKelvin > (temperatureCelsius + 273.15) ? "hot" : "cold";
}

export const getDailyIcon = (optionKey: string) => {
  const options = {
    "00:00": 'cloudy-moon',
    "03:00": 'cloudy-moon',
    "06:00": 'cloud',
    "09:00": 'sunny-cloud',
    "12:00": 'sunny-cloud',
    "15:00": 'sunny-cloud',
    "18:00":'cloud',
    "21:00":'cloud'
  }
  return options[optionKey as keyof typeof options];
}
