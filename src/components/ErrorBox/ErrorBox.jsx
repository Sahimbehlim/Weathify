import styles from "./Error.module.css";

const ErrorBox = ({ errorMsg }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Oops!</h2>
      <p className={styles.errorMsg}>{errorMsg}</p>
    </div>
  );
};

export default ErrorBox;
