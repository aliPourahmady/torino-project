import Image from "next/image";
import React from "react";

import styles from "./Options.module.css";

function Options() {
  return (
    <>
      <hr className={styles.line} />
      <div className={styles.container}>
        <div className={styles.info}>
          <Image
            src="/images/Group 16 (1).svg"
            width={71}
            height={64}
            alt="discount"
          />
          <div>
            <h2>بصرفه ترین قیمت</h2>
            <p>بصرفه ترین و ارزان ترین قیمت تور را از ما بخواهید.</p>
          </div>
        </div>
        <div className={styles.info}>
          <Image
            src="/images/Group 17 (1).svg"
            width={64}
            height={64}
            alt="suppoert"
          />
          <div>
            <h2>پشتیبانی</h2>
            <p>پشتیبانی و همراهی 24 ساعته در تمامی مراحل سفر شما.</p>
          </div>
        </div>
        <div className={styles.info}>
          <Image
            src="/images/Group 18 (1).svg"
            width={61}
            height={61}
            alt="heart"
          />
          <div>
            <h2>رضایت کاربران</h2>
            <p>رضایت بیش از 10هزار کاربر از تور های ما.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Options;
