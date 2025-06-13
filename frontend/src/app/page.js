import styles from "./page.module.css";
import HomePage from "@/pages/HomePage";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomePage />
    </div>
  );
}
