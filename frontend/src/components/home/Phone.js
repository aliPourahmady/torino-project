import Image from "next/image";
import { digitsEnToFa } from "@persian-tools/persian-tools";

import styles from "./Phone.module.css";

function Phone() {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.boxTitle}>
          <h2>
            خرید تلفنی از <span>تورینو</span>
          </h2>
          <p>به هرکجا که میخواهید!</p>
        </div>
        <div className={styles.boxImg}>
          <Image src="/images/man.svg" width={195} height={158} alt="man" />
        </div>
      </div>
      <div className={styles.phone}>
        <p>
          <span dir="ltr">{digitsEnToFa("021-1840")}</span>
          <Image src="/images/call (1).svg" alt="call" width={20} height={20} />
        </p>
        <button>اطلاعات بیشتر</button>
      </div>
    </section>
  );
}

export default Phone;
