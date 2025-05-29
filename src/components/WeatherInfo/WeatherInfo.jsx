import { useWeather } from "../../context/WeatherContext";
import WeatherCard from "./WeatherCard";
import styles from "./WeatherInfo.module.css";

const WeatherInfo = () => {
  const { todayWeather, fiveDayForecast } = useWeather();

  const weatherInfo = todayWeather?.info;
  const cityName = todayWeather?.cityName;
  const icon = weatherInfo?.weather?.[0]?.icon;
  const description = weatherInfo?.weather?.[0]?.description;

  if (!weatherInfo) return null;

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <WeatherCard cityName={cityName} weatherData={weatherInfo} currentDay />
        {icon && (
          <div className={styles.todayWeatherInfoBox}>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              className={styles.todayWeatherInfoBoxImg}
              alt="weather icon"
            />
            {description && (
              <p className={styles.todayWeatherInfoBoxText}>{description}</p>
            )}
          </div>
        )}
      </div>

      <div className={styles.bottomContainer}>
        <h2 className={styles.bottomContainerHeading}>5-day forecast</h2>
        <div className={styles.fiveDayForecastBox}>
          {fiveDayForecast?.map((data, index) => (
            <WeatherCard
              key={index}
              weatherData={data}
              className={styles.fiveDayForecastSubBox}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
