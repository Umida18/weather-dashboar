import type { WeatherState, WeatherAction } from "../types/weather";

export const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  loading: false,
  error: null,
  selectedCity: "London",
  units: "celsius",
  darkMode: false,
  refreshRate: 60,
};

export const weatherReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case "FETCH_WEATHER_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        currentWeather: action.payload.current,
        forecast: action.payload.forecast,
        error: null,
      };
    case "FETCH_WEATHER_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CHANGE_CITY":
      return {
        ...state,
        selectedCity: action.payload,
      };
    case "TOGGLE_UNIT":
      return {
        ...state,
        units: state.units === "celsius" ? "fahrenheit" : "celsius",
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "SET_REFRESH_RATE":
      return {
        ...state,
        refreshRate: action.payload,
      };
    default:
      return state;
  }
};
