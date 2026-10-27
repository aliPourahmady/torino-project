import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <hr className={styles.line} />
      <footer className={styles.container}>
        <div className={styles.list}>
          <div>
            <ul>
              <li>تورینو</li>
              <li>
                <Link href="#">درباره ما</Link>
              </li>
              <li>
                <Link href="#">تماس با ما</Link>
              </li>
              <li>
                <Link href="#">چرا تورینو</Link>
              </li>
              <li>
                <Link href="#">بیمه مسافرتی</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>خدمات مشتریان</li>
              <li>
                <Link href="#">پشتیبانی آنلاین</Link>
              </li>
              <li>
                <Link href="#">راهنمای خرید</Link>
              </li>
              <li>
                <Link href="#">راهنمای استرداد</Link>
              </li>
              <li>
                <Link href="#">پرسش و پاسخ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.mark}>
          <div className={styles.markLogo}>
            <Image
              src={"images/Torino (4) 1.svg"}
              alt="Logo"
              width={146}
              height={44}
            />
            <p>
              تلفن پشتیبانی:
              <span>021-8574</span>
            </p>
          </div>
          <div className={styles.markImage}>
            <Image
              src="images/state-airline-f45c55b2 1.svg"
              alt="airline"
              width={78}
              height={74}
            />
            <Image
              src="images/passenger-rights-48368f81 1.svg"
              alt="airline"
              width={78}
              height={74}
            />
            <Image
              src="images/ecunion-35c3c933.svg"
              alt="airline"
              width={78}
              height={74}
            />
            <Image
              src="images/samandehi-6e2b448a.svg"
              alt="airline"
              width={78}
              height={74}
            />
            <Image
              src="images/aira-682b7c43.svg"
              alt="airline"
              width={78}
              height={74}
            />
          </div>
        </div>
      </footer>
      <hr />
      <p className={styles.watermark}>
        کلیه حقوق این وب سایت متعلق به تورینو میباشد.
      </p>
    </>
  );
}

export default Footer;
