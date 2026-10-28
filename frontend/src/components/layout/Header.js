"use client";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import SendOtpModal from "@/auth/SendOtpModal";
import { useDispatch } from "react-redux";
import { openModal } from "@/store/features/auth/authSlice";
import { useProfile } from "@/hooks/useProfile";
import { digitsEnToFa } from "@persian-tools/persian-tools";

function Header() {
  const dispatch = useDispatch();
  const { data: profile, isLoading } = useProfile();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Image
            src={"images/Torino (4) 1.svg"}
            alt="Logo"
            width={146}
            height={44}
            loading="eager"
          />
          <ul>
            <li>
              <Link href="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link href="/">خدمات گردشگری</Link>
            </li>
            <li>
              <Link href="/">درباره ما</Link>
            </li>
            <li>
              <Link href="/">تماس با ما</Link>
            </li>
          </ul>
        </div>
        {isLoading ? (
          <div className={styles.skeleton} />
        ) : profile ? (
          <div className={styles.user}>
            <Image
              src="images/profile green.svg"
              width={24}
              height={24}
              alt="profile"
            />
            {digitsEnToFa(profile.mobile)}
            <Image
              src="images/arrow-down.svg"
              width={24}
              height={24}
              alt="arrow-down"
            />
          </div>
        ) : (
          <button onClick={() => dispatch(openModal())}>
            {" "}
            <Image
              src="images/profile green.svg"
              width={24}
              height={24}
              alt="profile"
            />
            ورود
            <span>|</span>
            ثبت نام
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
