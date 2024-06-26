import axios, { AxiosError } from "axios";

const API_URL = "https://fantastic-fiesta-qrxjqx465gv29r99-3000.app.github.dev/api";

export const getPlanetData = async (planet: string): Promise<PlanetData> => {
  return new Promise<PlanetData>((resolve, reject) => {
    axios
      .get(`${API_URL}/planet/${planet}`)
      .then((res) => {
        resolve({
          planet: planet,
          mercury: res.data.mercury,
          venus: res.data.venus,
          earth: res.data.earth,
          mars: res.data.mars,
          jupiter: res.data.jupiter,
          saturn: res.data.saturn,
          uranus: res.data.uranus,
          neptune: res.data.neptune,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Planet not found");
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


