import NavBar from "@/profile/NavBar";
import { profileTabs } from "src/const/profileTabs";
import styles from "./layout.module.css";

function ProfileLayout({ children }) {
  return (
    <div className={styles.container}>
      <NavBar tabs={profileTabs} />
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default ProfileLayout;
