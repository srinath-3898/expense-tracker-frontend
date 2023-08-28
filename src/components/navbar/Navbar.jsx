import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { setToken } from "@/store/auth/authSlice";
import { useRouter } from "next/router";

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

  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(setToken(null));
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles?.logo}>
        <Image src="/logo.png" width={50} height={50} alt="Logo" />
      </Link>
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
  );
};

export default Navbar;
