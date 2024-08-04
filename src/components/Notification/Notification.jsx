import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const getIcon = () => {
    return type === "success" ? "✅" : "⚠️";
  };

  return (
    <div className={`${styles.notification} ${styles[type]} ${isVisible ? styles.show : ''}`}>
      <span className={styles.icon}>{getIcon()}</span>
      {message}
    </div>
  );
};

export default Notification;