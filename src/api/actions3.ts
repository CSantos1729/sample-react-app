import axios, { AxiosError } from "axios";

const API_URL = "https://fantastic-fiesta-qrxjqx465gv29r99-3000.app.github.dev/api";

export const getDaysData = async (city: string): Promise<DaysData> => {
  return new Promise<DaysData>((resolve, reject) => {
    axios
      .get(`${API_URL}/days/${city}`)
      .then((res) => {
        resolve({
          city: city,
          dayOne: res.data.dayOne,
          dayTwo: res.data.dayTwo,
          dayThree: res.data.dayThree,
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


