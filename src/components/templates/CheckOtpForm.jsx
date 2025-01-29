import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { getProfile } from "src/services/user";
import { setCookie } from "src/utils/cookie";
import styles from "./CheckOtpForm.module.css"

function CheckOtpForm({ mobile, code, setCode, setStep }) {
  const { refetch } = useQuery(["profile"], getProfile);
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return toast.error("کدتایید نا معتبر است!");

    const { response, error } = await checkOtp(mobile, code);
    if (error) return toast.error("خطایی به وجود آمده است!");
    if (response.status === 200) toast.success("شما با موفقیت وارد شدید");
    console.log({ response, error });
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره «{mobile}» را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>

      <Toaster />
    </form>
  );
}

export default CheckOtpForm;
