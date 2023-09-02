import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Modal, Spin, Tooltip } from "antd";
import { setToken, setUser } from "@/store/auth/authSlice";
import { useRouter } from "next/router";
import { createOrder } from "@/store/payment/paymentActions";
import api from "@/configs/apiConfig";
import { profile } from "@/store/auth/authActions";
import { useEffect, useState } from "react";
import { resetPaymentData } from "@/store/payment/paymentSlice";

const authenticatedLinks = [
  { id: 1, title: "Home", url: "/" },
  { id: 4, title: "Expenses", url: "/expenses" },
];

const unAuthenticatedLinks = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Signin", url: "/signin" },
  { id: 3, title: "Signup", url: "/signup" },
];

const Navbar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { token, user } = useSelector((state) => state.auth);
  const {
    loading,
    message: paymentMessage,
    error,
  } = useSelector((state) => state.payment);

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setToken(null));
    dispatch(setUser(null));
    router.push("/");
  };

  const loadScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        reject(false);
      };
      document.body.appendChild(script);
    });
  };

  const updatePaymentStatus = async (payload) => {
    setMessageModalOpen(false);
    dispatch(resetPaymentData());
    if (payload?.data?.status) {
      const { rpOrderId } = payload?.data?.data;
      const res = await loadScript();
      if (res) {
        const options = {
          key: "rzp_test_HOTPHJrQjTkXoL",
          order_id: rpOrderId,
          handler: async (response) => {
            await api.post("/payment/update-status", {
              rpOrderId: response?.razorpay_order_id,
              status: "SUCCESS",
            });
            dispatch(profile());
          },
        };
        const rzp = new Razorpay(options);
        rzp.open();
        rzp.on("payment.failed", async (error) => {
          await api.post("/payment/update-status", {
            rpOrderId: error?.error?.metadata?.order_id,
            status: "FAILED",
          });
        });
      }
    }
  };

  const handleCreateOrder = async () => {
    const orderId = `${user?.id}_${Date.now()}`;
    dispatch(createOrder(orderId))
      .then(({ payload }) => {
        setTimeout(() => {
          updatePaymentStatus(payload);
        }, 3000);
      })
      .catch((error) => {
        setMessageModalOpen(false);
      });
  };
  useEffect(() => {
    if (paymentMessage || error) {
      setMessageModalOpen(true);
    }
  }, [paymentMessage, error]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_1}>
          <Link href={"/"} className={styles?.logo}>
            <Image src="/logo.png" width={50} height={50} alt="Logo" />
          </Link>
          {user && !user?.premiumUser ? (
            <button
              className={styles.buy_premium}
              onClick={handleCreateOrder}
              disabled={loading}
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ color: "#ffffff", fontSize: "16px" }}
                    />
                  }
                />
              ) : (
                "Buy premium"
              )}
            </button>
          ) : (
            <></>
          )}
          {user && user?.premiumUser ? (
            <div>
              <p>You are a premium user </p>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className={styles.links}>
          {token ? (
            <>
              {authenticatedLinks.map((link) => (
                <Link
                  key={link?.id}
                  href={link?.url}
                  className={`${styles.nav_link} ${
                    pathname === link?.url ? styles.active_nav_link : ""
                  }`}
                >
                  {link?.title}
                </Link>
              ))}
              {user && user?.premiumUser ? (
                <Link
                  href={"/leaderboard"}
                  className={`${styles.nav_link} ${
                    pathname === "/leaderboard" ? styles.active_nav_link : ""
                  }`}
                >
                  Leaderborard
                </Link>
              ) : (
                <></>
              )}
              <Tooltip title="Logout">
                <LogoutOutlined
                  style={{ color: "#000000", fontSize: 25 }}
                  onClick={handleLogout}
                />
              </Tooltip>
            </>
          ) : (
            unAuthenticatedLinks.map((link) => (
              <Link
                key={link?.id}
                href={link?.url}
                className={`${styles.nav_link} ${
                  pathname === link?.url ? styles.active_nav_link : ""
                }`}
              >
                {link?.title}
              </Link>
            ))
          )}
        </div>
      </div>
      <Modal
        title={null}
        open={messageModalOpen}
        footer={null}
        closable={false}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.message_modal}>
          <p>{paymentMessage ? paymentMessage : error}</p>
          <Spin
            indicator={
              <LoadingOutlined style={{ color: "#000000", fontSize: "16px" }} />
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
