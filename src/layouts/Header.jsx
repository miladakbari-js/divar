import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { deleteCookie } from "src/utils/cookie";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "src/services/user";
import toast from "react-hot-toast";

function Header() {
  const { refetch, data } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();

  const clickHandler = () => {
    deleteCookie();
    navigate("/");
    toast.success("با موفقیت از حساب خود خارج شدید");
    refetch();
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        {/* ------------------menubar------------------ */}
        <div className={styles.menu}>
          <span>
            <img src="menu.svg" />
            <p>منو</p>
          </span>
          <div className={styles.menuitems}>
            <div>
              <Link to="/auth">
                <span>
                  <img src="profile.svg" />
                  <p>دیوار من</p>
                </span>
              </Link>
            </div>
            <div>
              {data?.data?.role === "ADMIN" && (
                <Link to="/admin" className={styles.admin}>
                  <span>
                    <img
                      src="setting.svg"
                      style={{
                        width: "30px",
                        height: "30px",
                        fontSize: "1rem",
                      }}
                    />
                    <p>ادمین</p>
                  </span>
                </Link>
              )}
            </div>
            <div>
              <span>
                {!!data ? (
                  <>
                    {" "}
                    <button onClick={clickHandler} className={styles.exit}>
                      <img src="exit.svg" />
                    </button>{" "}
                    <p>خروج</p>
                  </>
                ) : null}
              </span>
            </div>
          </div>
        </div>
        {/* ----------------close menubar---------------------- */}
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
