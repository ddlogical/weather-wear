export type DayPeriod = "night" | "morning" | "day" | "evening";

export type PeriodData = Record<string, WeatherForecast | null>;

export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export type ParsedWeatherForecast = {
  date: string;
  periods: Record<DayPeriod, PeriodData>;
};

export interface WeatherData {
  city: {
    id: number;
    name: string;
  };
  list: WeatherForecast[];
}

export interface Weather {
  name: string;
  forecast: ParsedWeatherForecast[];
}
