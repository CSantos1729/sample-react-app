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
  import { getPlanetData } from "../api/actions3";
  
  const PlanetCard: React.FC = () => {
    const [data, setData] = useState<PlanetData>();
    const [loadingState, setLoadingState] = useState(false);
    const [planet, setPlanet] = useState("");
    const [error, setError] = useState("");
  
    const handleSearch = () => {
      console.log("Fetching Days Data...");
      console.log(planet);
      setLoadingState(true);
      getPlanetData(planet)
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
      <Card className="w-full md:max-w-[500px] mx-auto">
        <CardHeader className="flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold">Planets Temperatures</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex flex-col w-full p-2 space-y-4">
              <Input
                id="planetname"
                type="text"
                label="Planet"
                value={planet}
                onChange={(e) => {
                  setPlanet(e.target.value);
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
              <h1 className="text-3xl font-bold">{data.planet}</h1>
        
              <p className="text-lg">Mercury: {data.mercury}350°C</p>
              <p className="text-lg">Venus: {data.venus} 465°C</p>
              <p className="text-lg">Earth: {data.earth} 34°C</p>
              <p className="text-lg">Mars: {data.mars}-46°C</p>
              <p className="text-lg">Jupiter: {data.jupiter} -123°C</p>
              <p className="text-lg">Saturn: {data.saturn} -150°C</p>
              <p className="text-lg">Uranus: {data.uranus} -197°C</p>
              <p className="text-lg">Neptune: {data.neptune}-201°C</p>
          
            </div>
          </CardBody>
        ) : (
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a planet name</p>
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
  
  export default PlanetCard;
  