"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { openModal } from "@/store/features/auth/authSlice";
import { useProfile } from "@/hooks/useProfile";
import { navLinks } from "src/const/navlinks";
import DropDown from "@/ui/DropDown";
import MobileMenu from "@/ui/MobileMenu";
import styles from "./Header.module.css";

function Header() {
  const dispatch = useDispatch();
  const { data: profile, isLoading } = useProfile();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleHover = (e, value) => {
    if (e.pointerType === "mouse") setDropdownVisible(value);
  };
  const handleUserClick = () => {
    if (window.matchMedia("(hover: none)").matches) {
      setDropdownVisible((v) => !v);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <MobileMenu links={navLinks} />

          <Image
            className={styles.logo}
            src="/images/Torino (4) 1.svg"
            alt="Logo"
            width={146}
            height={44}
            loading="eager"
          />

          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {isLoading ? (
          <div className={styles.skeleton} />
        ) : profile ? (
          <div
            onPointerEnter={(e) => handleHover(e, true)}
            onPointerLeave={(e) => handleHover(e, false)}
            onClick={handleUserClick}
            className={styles.hover}
          >
            <div className={styles.user}>
              <Image
                src="/images/profile green.svg"
                width={24}
                height={24}
                alt="profile"
              />
              <span className={styles.userNumber}>
                {digitsEnToFa(profile.mobile)}
              </span>
              <Image
                className={styles.arrow}
                src="/images/arrow-down.svg"
                width={24}
                height={24}
                alt="arrow-down"
              />
            </div>
            {isDropdownVisible && <DropDown mobile={profile.mobile} />}
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => dispatch(openModal())}
            aria-label="ورود | ثبت نام"
          >
            <Image
              className={styles.loginIcon}
              src="/images/login.svg"
              width={20}
              height={20}
              alt=""
            />
            <span className={styles.loginText}>
              <Image
                src="/images/profile green.svg"
                width={24}
                height={24}
                alt=""
              />
              ورود
              <span className={styles.sep}>|</span>
              ثبت نام
            </span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
