import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>©ExpensTracker All rights reserved</p>
        <div className={styles.social}>
          <Image
            src="/instagram.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Instagram Account"
          />
          <Image
            src="/facebook.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Facebook Account"
          />
          <Image
            src="/youtube.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Youtube Account"
          />
          <Image
            src="/linkedin.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="=Linkedin Account"
          />
          <Image
            src="/twitter.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Twitter Account"
          />
          <Image
            src="/whatsapp.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Twitter Account"
          />
          <Image
            src="/linkedin.png"
            width={20}
            height={20}
            className={styles?.icon}
            alt="Twitter Account"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
