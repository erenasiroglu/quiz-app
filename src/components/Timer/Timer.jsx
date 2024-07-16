import React from "react";
import styles from "./styles.module.css";

const Timer = ({ timeLeft }) => {
  return <div className={styles.timer}>Time Left: {timeLeft}</div>;
};

export default Timer;
