import axios, { AxiosError } from "axios";

const API_URL = "https://fantastic-fiesta-qrxjqx465gv29r99-3000.app.github.dev/api";

export const getMarsWeatherData = async (sol: number): Promise<MarsWeatherData> => {
  return new Promise<MarsWeatherData>((resolve, reject) => {
    axios
      .get(`${API_URL}/mars-weather/${sol}`)
      .then((res) => {
        resolve({
          sol: res.data.sol,
          temperature: res.data.temperature,
          pressure: res.data.pressure,
          wind: res.data.wind,
          // Add more fields if needed
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Mars sol not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
