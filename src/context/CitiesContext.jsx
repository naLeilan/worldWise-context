import { createContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider() {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return <div></div>;
}

export { CitiesContext, CitiesProvider };
