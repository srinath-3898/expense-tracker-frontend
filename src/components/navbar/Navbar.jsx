import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Expenses", url: "/expenses" },
  { id: 3, title: "Signup", url: "signup" },
];

const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles?.logo}>
        <Image src="/logo.png" width={50} height={50} alt="Logo" />
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link?.id} href={link?.url} className={styles.link}>
            {link?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
