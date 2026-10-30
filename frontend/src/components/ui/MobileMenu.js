"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./MobileMenu.module.css";

function MobileMenu({ links }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button className={styles.burger} onClick={() => setIsOpen(true)}>
        <Image
          src="/images/Group 46.svg"
          width={20}
          height={16}
          alt="hambergure"
        />
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <nav className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <ul>
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={pathname === link.href ? styles.active : ""}
                  >
                    <Image src={link.icon} width={20} height={20} alt="" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default MobileMenu;
