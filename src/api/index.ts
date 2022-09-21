import { CountryPromise } from "../types";

export async function getCountrySuggestions(name: string): Promise<CountryPromise> {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => response.json())
    .catch((error) => {
      return Promise.reject(error);
    });
}

const api = {
  getCountrySuggestions,
};

export default api;
