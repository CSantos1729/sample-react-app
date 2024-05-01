import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Input, Button } from "@nextui-org/react";
import { getSpaceWeatherData } from "../api/actions4"; // Assuming you have a function to fetch space weather data

const SpaceWeatherCard: React.FC = () => {
  const [data, setData] = useState<SpaceWeatherData>();
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(""); // Additional state to input date

  const handleSearch = () => {
    setLoadingState(true);
    getSpaceWeatherData(date)
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
      <CardHeader className="flex gap-3">
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="date"
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
            <h1 className="text-3xl font-bold">Space Weather</h1>
            <p className="text-lg">Date: {data.date}</p>
            <p className="text-lg">Solar Wind Speed: {data.solarWindSpeed} km/s</p>
            <p className="text-lg">Geomagnetic Storm: {data.geomagneticStorm}</p>
            {/* Add more space weather data fields here */}
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please select a date</p>
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

export default SpaceWeatherCard;
