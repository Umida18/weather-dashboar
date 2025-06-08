import { useReducer, useEffect, useCallback } from "react";
import { weatherReducer, initialState } from "../reducers/weatherReducer";
import { fetchWeatherData } from "../services/api";

const convertTemperature = (
  temp: number,
  from: "celsius" | "fahrenheit",
  to: "celsius" | "fahrenheit"
): number => {
  if (from === to) return temp;
  return from === "celsius" ? (temp * 9) / 5 + 32 : ((temp - 32) * 5) / 9;
};

const debounce = <T extends (arg: string) => unknown>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((arg: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(arg), wait);
  }) as T;
};

export const useWeatherData = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchData = useCallback(async (city: string) => {
    try {
      dispatch({ type: "FETCH_WEATHER_START" });
      const data = await fetchWeatherData(city);
      dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_WEATHER_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to fetch weather data",
      });
    }
  }, []);

  const handleCityChange = useCallback(
    debounce((city: string) => {
      dispatch({ type: "CHANGE_CITY", payload: city });
      fetchData(city);
    }, 100),
    [fetchData]
  );

  const toggleUnit = useCallback(() => {
    dispatch({ type: "TOGGLE_UNIT" });
  }, []);

  const toggleDarkMode = useCallback(() => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  }, []);

  const setRefreshRate = useCallback((rate: number) => {
    dispatch({ type: "SET_REFRESH_RATE", payload: rate });
  }, []);

  useEffect(() => {
    fetchData(state.selectedCity);
    const interval = setInterval(() => {
      fetchData(state.selectedCity);
    }, state.refreshRate * 1000);
    return () => clearInterval(interval);
  }, [state.selectedCity, state.refreshRate, fetchData]);

  const transformedData = {
    ...state,
    currentWeather: state.currentWeather
      ? {
          ...state.currentWeather,
          temperature: convertTemperature(
            state.currentWeather.temperature,
            "celsius",
            state.units
          ),
        }
      : null,
    forecast: state.forecast.map((item) => ({
      ...item,
      temperature: convertTemperature(item.temperature, "celsius", state.units),
    })),
  };

  return {
    ...transformedData,
    handleCityChange,
    toggleUnit,
    toggleDarkMode,
    setRefreshRate,
  };
};
