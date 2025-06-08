import axios from "axios";
import type { WeatherData, ForecastData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  }>;
}

export const fetchWeatherData = async (
  city: string
): Promise<{ current: WeatherData; forecast: ForecastData[] }> => {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      axios.get<OpenWeatherResponse>(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }),
      axios.get<OpenWeatherForecastResponse>(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }),
    ]);

    const current: WeatherData = {
      city: currentResponse.data.name,
      temperature: currentResponse.data.main.temp,
      description: currentResponse.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${currentResponse.data.weather[0].icon}@2x.png`,
      humidity: currentResponse.data.main.humidity,
      windSpeed: currentResponse.data.wind.speed,
    };

    const dailyForecasts = forecastResponse.data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          temperatures: [],
          descriptions: [],
          icons: [],
        };
      }
      acc[date].temperatures.push(item.main.temp);
      acc[date].descriptions.push(item.weather[0].description);
      acc[date].icons.push(item.weather[0].icon);
      return acc;
    }, {} as Record<string, { temperatures: number[]; descriptions: string[]; icons: string[] }>);

    const forecast: ForecastData[] = Object.entries(dailyForecasts).map(
      ([date, data]) => ({
        date,
        temperature:
          data.temperatures.reduce((a, b) => a + b) / data.temperatures.length,
        description:
          data.descriptions[Math.floor(data.descriptions.length / 2)],
        icon: `https://openweathermap.org/img/wn/${
          data.icons[Math.floor(data.icons.length / 2)]
        }@2x.png`,
      })
    );

    return { current, forecast: forecast.slice(0, 5) };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
    throw error;
  }
};
