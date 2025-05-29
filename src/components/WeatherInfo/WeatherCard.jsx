import styles from "./WeatherCard.module.css";

const WeatherCard = ({ cityName, weatherData, currentDay, className }) => {
  if (!weatherData) return null;

  const date = weatherData.dt_txt?.split(" ")[0] ?? "N/A";
  const icon = weatherData.weather?.[0]?.icon;
  const temperatureC = weatherData.main?.temp
    ? (weatherData.main.temp - 273.15).toFixed(2)
    : "N/A";
  const windSpeed = weatherData.wind?.speed ?? "N/A";
  const humidity = weatherData.main?.humidity ?? "N/A";

  const headingClass = `${styles.heading} ${
    currentDay ? styles.currentDayHeading : styles.fiveDayForecastHeading
  }`;

  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={headingClass}>
        {cityName && <span>{cityName} - </span>}
        <span>({date})</span>
      </h2>

      {!currentDay && icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          className={styles.img}
          alt="weather icon"
        />
      )}

      <p className={styles.subText}>Temperature: {temperatureC}°C</p>
      <p className={styles.subText}>Wind: {windSpeed} M/S</p>
      <p className={styles.subText}>Humidity: {humidity}%</p>
    </div>
  );
};

export default WeatherCard;
