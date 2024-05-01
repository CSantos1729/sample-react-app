import "./App.css";
import NavBar from "./components/NavBar";
import WeatherCard from "./components/WeatherCard";
import PlanetCard from "./components/PlanetCard";


const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-row items-centre align-centre justify-centre h-full w-full">
        <WeatherCard />
        <PlanetCard />
        

        
      </div>
    </div>
  );
};

export default App;
