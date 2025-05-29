import { FadeLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = ({ text }) => {
  return (
    <div className={styles.container}>
      <FadeLoader color="#0ea5e9" size={80} />
      <p className={styles.loaderText}>{text}</p>
    </div>
  );
};

export default Loader;
