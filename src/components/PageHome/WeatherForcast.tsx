import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
}
const WeatherForcast = () => {
  const { themeColors } = useTheme();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherMessage, setWeatherMessage] =
    useState<string>("Loading weather...");

  useEffect(() => {
    // Stockholm coordinates
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=59.33&longitude=18.06&current_weather=true"
    )
      .then((res) => res.json())
      .then((data) => {
        const w = data.current_weather;
        const parsed: WeatherData = {
          temperature: w.temperature,
          windspeed: w.windspeed,
          weathercode: w.weathercode,
        };
        setWeather(parsed);

        // very simple tips based on temp & wind
        let msg = `Current temp: ${parsed.temperature}°C, wind ${parsed.windspeed} m/s. `;
        if (parsed.temperature <= 0) {
          msg +=
            "Roads may be icy – increase following distance and brake gently.";
        } else if (parsed.windspeed > 10) {
          msg += "It is quite windy – keep both hands on the steering wheel.";
        } else {
          msg +=
            "Nice conditions for practice – focus on smooth steering and scanning traffic.";
        }
        setWeatherMessage(msg);
      })
      .catch(() =>
        setWeatherMessage(
          "Could not load weather. Drive carefully and adjust speed."
        )
      );
  }, []);
  return (
    <div>
      <div
        className={` ${themeColors.bgWidget} shadow-lg rounded-lg p-6 flex flex-col justify-between text-sm ${themeColors.border} border ${themeColors.text}`}
      >
        <h2 className={`text-xl font-semibold mb-2 ${themeColors.text}`}>
          Weather & Driving Tip
        </h2>
        <div className="text-5xl font-bold text-blue-700" data-testid="weather-forcast">
          <span data-testid="weather-temperature">{weather?.temperature}°C</span>
        </div>

        <div className="text-lg text-gray-600 dark:text-gray-300" data-testid="weather-condition">
          Wind: {weather?.windspeed} m/s
          <br />
          <div className="text-lg text-red-600 dark:text-gray-300">
            <p>Tips: {weatherMessage}</p>
          </div>
        </div>
        <br />
        <p className={`text-xs ${themeColors.text}`}>
          Weather data: Stockholm, live from Open-Meteo. Always adapt speed and
          distance to road conditions.
        </p>
      </div>
    </div>
  );
};

export default WeatherForcast;
