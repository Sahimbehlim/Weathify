import styles from "./DefaultScreen.module.css";

const DefaultScreen = () => {
  return (
    <div className={styles.container}>
      <img src="/splash-icon.svg" className={styles.img} alt="splash icon" />
      <p className={styles.subText}>
        Explore current weather data and 5-day forecast of more than 200,000
        cities!
      </p>
    </div>
  );
};

export default DefaultScreen;
