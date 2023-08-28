"use client";
import "@/styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import styles from "./App.module.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Inter } from "next/font/google";
import { store, wrapper } from "@/store/store";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setToken } from "@/store/auth/authSlice";

const inter = Inter({ subsets: ["latin"] });
function App({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
    } else {
      router.push("/signin");
    }
  }, []);

  return (
    <Provider store={store}>
      <div className={`${styles.container} ${inter.className}`}>
        <Navbar />
        <div className={styles.page}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default wrapper.withRedux(App);
