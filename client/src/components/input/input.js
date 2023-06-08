import styles from "./input.module.css";

const Input = ({ type, text, name, placeholder, handleOnChange, value, alert }) => {
  return (
    <div className={styles.inputControl}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
      />
      <span className={styles.spanRequired}>{alert}</span>
    </div>
  );
};

export default Input;
