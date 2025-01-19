export const replaceSpaces = (value: string): string =>
  value.replace(/\s/g, "-");

export const restoreSpaces = (value: string): string =>
  value.trim().replace(/-/g, " ");

export const convertTemperature = (
  temp: number,
  format: "celsius" | "fahrenheit"
): string => {
  const kelvinToCelsius = (temp: number) => temp - 273.15;
  const kelvinToFahrenheit = (temp: number) => ((temp - 273.15) * 9) / 5 + 32;

  const formatTemperature = (value: number, unit: string): string =>
    `${value >= 0 ? "+" : ""}${value.toFixed(1)}\u00B0${unit}`;

  const convertedTemp =
    format === "celsius" ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);

  const unit = format === "celsius" ? "C" : "F";

  return formatTemperature(convertedTemp, unit);
};

export const getRandom = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
