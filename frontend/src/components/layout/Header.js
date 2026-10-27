import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <Image
            src={"images/Torino (4) 1.svg"}
            alt="Logo"
            width={146}
            height={44}
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
        <button>
          {" "}
          <Image src="images/profile green.svg" width={24} height={24} />
          ورود
          <span>|</span>
          ثبت نام
        </button>
      </div>
    </header>
  );
}

export default Header;
