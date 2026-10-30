"use client";
import { logout } from "@/services/user";
import Image from "next/image";
import Link from "next/link";

import styles from "./DropDown.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function DropDown({ mobile }) {
  const queryCLient = useQueryClient();
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      await logout();
      queryCLient.setQueryData(["profile"], null);
      router.replace("/");
      router.refresh();
    } catch (er) {
      toast.error("خروج از حساب با مشکل مواجه شد.");
    }
  };
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Image
            src="images/profile (3).svg"
            width={16}
            height={16}
            alt="profile"
          />
          {mobile}
        </li>
        <li>
          <Link href="/profile">
            <Image
              src="images/profile (2).svg"
              width={20}
              height={20}
              alt="profile user"
            />
            اطلاعات حساب کاربری
          </Link>
        </li>
        <li onClick={logoutHandler}>
          <Image src="images/logout.svg" width={20} height={20} alt="logout" />
          خروج از حساب کاربری
        </li>
      </ul>
    </div>
  );
}

export default DropDown;
