import styles from "./button.module.css";

const Button = ({text, backgroundColor, color }) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {text}
    </button>
  );
};

export default Button;
