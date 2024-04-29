import axios, { AxiosError } from "axios";

const API_URL = "https://65ca483b3b05d29307e01640.mockapi.io/api/";

export const getSeismicData = async (city: string): Promise<SeismicData> => {
  return new Promise<SeismicData>((resolve, reject) => {
    axios
      .get(`${API_URL}/seismic/${city}`)
      .then((res) => {
        resolve({
          city: city,
          temperature: res.data.temperature,
          magnitute: res.data.magnitute,
          latitude: res.data.latitude,
          longitude: res.data.rain,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("City not found");
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