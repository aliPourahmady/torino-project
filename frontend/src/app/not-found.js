import Image from "next/image";
import Link from "next/link";

import styles from "./not-found.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>صفحه مورد نظر یافت نشد!</h1>
        <Link href="/" className={styles.btn}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <div className={styles.img}>
        <Image
          src="/images/Error TV.svg"
          alt="404ERROR"
          width={350}
          height={350}
        />
      </div>
    </div>
  );
}

export default NotFound;
