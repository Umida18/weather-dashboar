import "./index.css";
import WeatherWidget from "./components/WeatherWidget";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div
      // className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
      >
        <WeatherWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;
