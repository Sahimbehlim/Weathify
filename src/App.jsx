import {
  Loader,
  WeatherInfo,
  Search,
  ErrorBox,
  DefaultScreen,
} from "./components/index";
import { useWeather } from "./context/WeatherContext";
import styles from "./App.module.css";
import { FaGithub } from "react-icons/fa";

const App = () => {
  const { loading, todayWeather, error } = useWeather();

  const renderContent = () => {
    if (loading) return <Loader text="Fetching weather..." />;
    if (error) return <ErrorBox errorMsg={error || "Something went wrong!"} />;
    if (todayWeather) return <WeatherInfo />;
    return <DefaultScreen />;
  };

  return (
    <section className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.headerBox}>
          <img src="/logo.png" className={styles.logo} alt="logo" />
          <a href="https://github.com/Sahimbehlim/Weathify" target="_blank">
            <FaGithub size={28} color="#FFF" />
          </a>
        </div>
        <Search />
        {renderContent()}
      </div>
    </section>
  );
};

export default App;
