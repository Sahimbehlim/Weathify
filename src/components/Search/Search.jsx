import { useWeather } from "../../context/WeatherContext";
import styles from "./Search.module.css";

const Search = () => {
  const { cityName, setCityName, getCityCoordinates } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    getCityCoordinates();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        type="search"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className={styles.input}
        placeholder="Enter city name..."
        required
      />
      <button className={styles.btn}>Search</button>
    </form>
  );
};

export default Search;
