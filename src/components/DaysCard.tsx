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
  import { getDaysData } from "../api/actions3";
  
  const DaysCard: React.FC = () => {
    const [data, setData] = useState<DaysData>();
    const [loadingState, setLoadingState] = useState(false);
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
  
    const handleSearch = () => {
      console.log("Fetching Days Data...");
      console.log(city);
      setLoadingState(true);
      getDaysData(city)
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
        
              <p className="text-lg">Day 1: {data.dayOne}%</p>
              <p className="text-lg">Day 2: {data.dayTwo} km/h</p>
              <p className="text-lg">Day 3: {data.dayThree} %</p>
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
  
  export default DaysCard;
  