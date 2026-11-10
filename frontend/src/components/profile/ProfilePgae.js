"use client";
import Skeleton from "react-loading-skeleton";
import { useProfile } from "@/hooks/useProfile";
import UserInfo from "./UserInfo";
import PersonalInfo from "./PersonalInfo";
import BankInfo from "./BankInfo";
import styles from "./ProfilePage.module.css";

function ProfilePgae() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton height={110} borderRadius={10} />
        <Skeleton height={190} borderRadius={10} />
        <Skeleton height={160} borderRadius={10} />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className={styles.container}>
      <UserInfo profile={profile} />
      <PersonalInfo profile={profile} />
      <BankInfo profile={profile} />
    </div>
  );
}

export default ProfilePgae;
