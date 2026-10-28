import Image from "next/image";
import Link from "next/link";

import styles from "./not-found.module.css";

function notFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>صفحه مورد نظر یافت نشد!</h3>
        <button>
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </button>
      </div>
      <div className={styles.img}>
        <Image
          src="images/Error TV.svg"
          alt="404ERROR"
          width={555}
          height={555}
        />
      </div>
    </div>
  );
}

export default notFound;
