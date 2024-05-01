import axios, { AxiosError } from "axios";


const API_URL = "https://fantastic-fiesta-qrxjqx465gv29r99-3000.app.github.dev/api";

export const getSpaceWeatherData = async (date: string): Promise<SpaceWeatherData> => {
  return new Promise<SpaceWeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/space-weather/${date}`)
      .then((res) => {
        resolve({
          date: date,
          solarWindSpeed: res.data.solarWindSpeed,
          geomagneticStorm: res.data.geomagneticStorm,
          // Add more fields as needed
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Data not found for the selected date");
          } else {
            reject(axiosError.message);
          }
        } else {
          reject("An unknown error occurred");
        }
      });
  });
};
