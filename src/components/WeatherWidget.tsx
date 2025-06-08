import React from "react";

import { Tabs, Spin } from "antd";

import { useWeatherData } from "../hooks/useWeatherData";
import { useTheme } from "../contexts/ThemeContext";

import CitySelector from "./CitySelector";
import WeatherDisplay from "./WeatherDisplay";
import ForecastList from "./ForecastList";
import DataVisualization from "./DataVisualization";
import SettingsPanel from "./SettingsPanel";
import ErrorBoundary from "./ErrorBoundary";

const WeatherWidget: React.FC = () => {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    handleCityChange,
    toggleUnit,
    setRefreshRate,
  } = useWeatherData();

  const { darkMode } = useTheme();

  const items = [
    {
      key: "current",
      label: "Current Weather",
      children: currentWeather && (
        <WeatherDisplay
          city={currentWeather.city}
          temperature={currentWeather.temperature}
          description={currentWeather.description}
          icon={currentWeather.icon}
          humidity={currentWeather.humidity}
          windSpeed={currentWeather.windSpeed}
        />
      ),
    },
    {
      key: "forecast",
      label: "Forecast",
      children: <ForecastList forecasts={forecast} />,
    },
    {
      key: "statistics",
      label: "Statistics",
      children: (
        <DataVisualization
          temperatureData={forecast.map((item) => ({
            date: item.date,
            value: item.temperature,
          }))}
          humidityData={forecast.map((item) => ({
            date: item.date,
            value: item.temperature,
          }))}
          windData={forecast.map((item) => ({
            date: item.date,
            value: item.temperature,
          }))}
        />
      ),
    },
  ];

  return (
    <ErrorBoundary>
      <div style={{ padding: "20px" }} className="mainContainer">
        <h1 className="text-2xl font-bold text-center mb-4">
          Weather Dashboard
        </h1>
        <CitySelector onCityChange={handleCityChange} />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        ) : (
          <Tabs
            items={items}
            className={darkMode ? "text-white" : "text-gray-900"}
          />
        )}
        <SettingsPanel
          onSettingsChange={(settings) => {
            if (settings.units) toggleUnit();
            if (settings.refreshRate) setRefreshRate(settings.refreshRate);
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default WeatherWidget;
