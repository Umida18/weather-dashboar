export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface WeatherState {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  loading: boolean;
  error: string | null;
  selectedCity: string;
  units: "celsius" | "fahrenheit";
  darkMode: boolean;
  refreshRate: number;
}

export type WeatherAction =
  | { type: "FETCH_WEATHER_START" }
  | {
      type: "FETCH_WEATHER_SUCCESS";
      payload: { current: WeatherData; forecast: ForecastData[] };
    }
  | { type: "FETCH_WEATHER_ERROR"; payload: string }
  | { type: "CHANGE_CITY"; payload: string }
  | { type: "TOGGLE_UNIT" }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "SET_REFRESH_RATE"; payload: number };
