import "./globals.css";
import { Inter } from "next/font/google";
import styles from "./Layout.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <Navbar />
          <div className={styles.page}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
