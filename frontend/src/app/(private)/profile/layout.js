import NavBar from "@/profile/NavBar";
import ProfilePgae from "@/profile/ProfilePgae";
import React, { Children } from "react";
import { profileTabs } from "src/const/profileTabs";
import styles from "./layout.module.css";

function ProfileLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <NavBar tabs={profileTabs} />
      <main className={styles.content}>{children}</main>
    </div>
  );
}

export default ProfileLayout;
