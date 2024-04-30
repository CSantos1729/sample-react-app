import "./App.css";
import NavBar from "./components/NavBar";
import SeismicCard from "./components/SeismicCard";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-row items-centre align-centre justify-centre h-full w-full">
        <WeatherCard />
        <SeismicCard />
        
      </div>
    </div>
  );
};

export default App;
