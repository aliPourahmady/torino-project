"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./error.module.css";

function error() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>اتصال با سرور برقرار نیست!</h3>
        <p>لطفا بعدا دوباره امتحان کنید.</p>
      </div>
      <div className={styles.img}>
        <Image
          src="images/Error Lamp Robot.svg"
          alt="500ERROR"
          width={555}
          height={555}
        />
      </div>
    </div>
  );
}

export default error;
