import styles from "./buttom.module.css";

export const MyButtom = ({
  textButtom,
  handleClick,
  textColor,
  backgroundColor,
}) => {
  return (
    <div className={styles.containerButtom}>
      <button
        className={styles.btn}
        style={{ color: textColor, backgroundColor: backgroundColor }}
        onClick={handleClick}
      >
        {textButtom}
      </button>
    </div>
  );
};
