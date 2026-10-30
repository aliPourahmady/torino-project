"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./error.module.css";

function error() {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <Image
          src="/images/Error Lamp Robot.svg"
          alt="500ERROR"
          width={350}
          height={350}
        />
      </div>
      <div className={styles.content}>
        <h1>اتصال با سرور برقرار نیست!</h1>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
    </div>
  );
}

export default error;
