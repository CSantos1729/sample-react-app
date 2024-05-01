import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { getMarsWeatherData } from "../api/actions5";

const MarsWeatherCard: React.FC = () => {
  const [data, setData] = useState<MarsWeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const [sol, setSol] = useState(""); // Additional state to input sol

  const handleSearch = () => {
    setLoadingState(true);
    getMarsWeatherData(3000)
      .then((res) => {
        setError("");
        setData(res);
        setLoadingState(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-center items-center flex-col">
      <h1 className="text-2xl font-bold">Mars Weather</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="sol"
              type="number"
              label="Sol"
              value={sol}
              onChange={(e) => setSol(e.target.value)}
            />
            <Button color="primary" isLoading={loadingState} type="submit">
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Mars Weather</h1>
            <p className="text-lg">Sol: {data.sol}</p>
            <p className="text-lg">Temperature: {data.temperature}°C</p>
            <p className="text-lg">Pressure: {data.pressure} Pa</p>
            <p className="text-lg">Wind Speed: {data.wind} m/s</p>
            {/* Add more Mars weather data fields here */}
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a Sol</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600">{error}</p>}
          {data && <p className="text-xs text-gray-600">Last update successful.</p>}
          {!data && <p className="text-xs text-gray-600">Waiting for input...</p>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default MarsWeatherCard;
