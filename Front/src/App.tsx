import "./App.css";
import CryptoList from "./components/CryptoList";
import WeatherWidget from "./components/WeatherWidget";

const App = () => {
  return (
    <div className="container mx-auto py-8">
      <WeatherWidget />
      <CryptoList />
    </div>
  );
};

export default App;
