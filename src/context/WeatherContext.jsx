import axios from "axios";
import {
  createContext,
  useState,
  useCallback,
  useContext,
  useRef,
  useEffect,
  useMemo,
} from "react";

const WeatherContext = createContext();
const API_KEY = import.meta.env.VITE_API_KEY;

const WeatherProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("");
  const [todayWeather, setTodayWeather] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const pollingRef = useRef(null);
  const lastCityRef = useRef(null);

  const fetchData = useCallback(async (url) => {
    try {
      const { data } = await axios.get(url);
      return { success: true, data };
    } catch (err) {
      console.error("API request failed:", err);
      return {
        success: false,
        error: "Network error. Please check your connection.",
      };
    }
  }, []);

  const getWeatherInfo = useCallback(
    async (name, lat, lon) => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      const { data } = await fetchData(url);
      if (!data) return;

      const uniqueDays = new Set();
      const fiveDays = data.list.filter((entry) => {
        const day = new Date(entry.dt_txt).getDate();
        if (!uniqueDays.has(day)) {
          uniqueDays.add(day);
          return true;
        }
        return false;
      });

      setTodayWeather({ info: data.list[0], cityName: name });
      setFiveDayForecast(fiveDays.slice(1));
      setCityName("");

      localStorage.setItem("lastCity", JSON.stringify({ name, lat, lon }));
      lastCityRef.current = { name, lat, lon };
    },
    [fetchData]
  );

  const getCityCoordinates = useCallback(async () => {
    if (!cityName.trim()) {
      return setError("City name can't be empty!");
    }

    setError("");
    setLoading(true);

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`;
    const result = await fetchData(url);

    setLoading(false);

    if (!result.success) {
      return setError(result.error);
    }

    const data = result.data;
    if (data?.length > 0) {
      const { name, lat, lon } = data[0];
      getWeatherInfo(name, lat, lon);
    } else {
      setError("Invalid city name, no coordinates found.");
    }
  }, [cityName, fetchData, getWeatherInfo]);

  useEffect(() => {
    const loadFromLocalStorage = async () => {
      try {
        const savedCity = localStorage.getItem("lastCity");
        if (savedCity) {
          setLoading(true);
          const { name, lat, lon } = JSON.parse(savedCity);
          lastCityRef.current = { name, lat, lon };
          await getWeatherInfo(name, lat, lon);
        }
      } catch (err) {
        console.error("Corrupt localStorage data", err);
        localStorage.removeItem("lastCity");
      } finally {
        setLoading(false);
      }
    };

    loadFromLocalStorage();
  }, [getWeatherInfo]);

  useEffect(() => {
    if (!lastCityRef.current) return;

    const { name, lat, lon } = lastCityRef.current;

    const poll = async () => {
      await getWeatherInfo(name, lat, lon);
    };

    pollingRef.current = setInterval(poll, 30000);

    return () => clearInterval(pollingRef.current);
  }, [getWeatherInfo]);

  const contextValue = useMemo(
    () => ({
      cityName,
      setCityName,
      getCityCoordinates,
      todayWeather,
      fiveDayForecast,
      loading,
      setLoading,
      error,
    }),
    [
      cityName,
      getCityCoordinates,
      todayWeather,
      fiveDayForecast,
      loading,
      error,
    ]
  );

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
export const useWeather = () => useContext(WeatherContext);
