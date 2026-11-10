import styles from "./Badge.module.css";

function Badge({ variant = "success", children }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
  );
}
export default Badge;
