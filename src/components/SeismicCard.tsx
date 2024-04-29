import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Button,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
  import { getSeismicData } from "../api/actions2";
  
  const SeismicCard: React.FC = () => {
    const [data, setData] = useState<SeismicData>();
    const [loadingState, setLoadingState] = useState(false);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
  
    const handleSearch = () => {
      console.log("Fetching Seismic Data...");
      console.log(city);
      setLoadingState(true);
      getSeismicData(city)
        .then((res) => {
          setError("");
          if (res) {
            console.log(res);
            setData(res);
            setLoadingState(false);
          }
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex flex-col w-full p-2 space-y-4">
              <Input
                id="cityname"
                type="text"
                label="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <Button
                className=""
                color="primary"
                isLoading={loadingState}
                type="submit"
              >
                Search
              </Button>
            </div>
          </form>
        </CardHeader>
        <Divider />
        {data ? (
          <CardBody>
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold">{data.city}</h1>
              {data.temperature > 20 ? (
                <div>
                  <TiWeatherSunny className="w-36 h-36" />
                </div>
              ) : (
                <div>
                  <TiWeatherDownpour className="w-36 h-36" />
                </div>
              )}
              <p className="text-3xl font-bold">{data.temperature}°C</p>
              <p className="text-lg">Magnitute: {data.magnitute}%</p>
              <p className="text-lg">latitude: {data.latitude} km/h</p>
              <p className="text-lg">longitude: {data.longitude} %</p>
            </div>
          </CardBody>
        ) : (
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a city</p>
            </div>
          </CardBody>
        )}
        <Divider />
        <CardFooter>
          <div className="flex flex-col items-left">
            {error && <p className="text-xs text-red-600 ">{error}</p>}
            {data && (
              <p className="text-xs  text-gray-600 ">Last update successful.</p>
            )}
            {!data && (
              <p className="text-xs  text-gray-600 ">Waiting for input...</p>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };
  
  export default SeismicCard;
  