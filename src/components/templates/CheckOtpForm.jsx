import toast, { Toaster } from "react-hot-toast";
import { checkOtp } from "services/auth";
import { setCookie } from "src/utils/cookie";

function CheckOtpForm({ mobile, code, setCode, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return toast.error("کدتایید نا معتبر است!");

    const { response, error } = await checkOtp(mobile, code);
    if (error) return toast.error("خطایی به وجود آمده است!");
    if (response.status === 200) toast.success("شما با موفقیت وارد شدید");
    console.log({ response, error });
    if (response) {
      setCookie(response.data);
    }
  };

  return (
    <form onSubmit={submitHandler}>
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
      <button onClick={() => setStep(1)}>تغییر شماره موبایل</button>

      <Toaster />
    </form>
  );
}

export default CheckOtpForm;
