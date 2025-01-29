import toast, { Toaster } from "react-hot-toast";
import { sendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css"

function SendOtpForm({ mobile, setMobile, setStep }) {
  
  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11)
      return toast.error("شماره موبایل نا معتبر است!!!");

    const { response, error } = await sendOtp(mobile);

    if (response) setStep(2);
    if (error) toast.error("خطایی رخ داده است!");
    console.log({ response, error });
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
        تایید به شماره شما ارسال خواهد شد
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        id="input"
        type="text"
        value={mobile}
        placeholder="شماره موبایل"
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال</button>
      <Toaster />
    </form>
  );
}

export default SendOtpForm;
