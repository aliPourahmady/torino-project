"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./NavBar.module.css";

function NavBar({ tabs }) {
  const pathname = usePathname();

  return (
    <nav className={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <Image
              src={isActive ? tab.activeIcon : tab.icon}
              width={20}
              height={20}
              alt=""
            />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;