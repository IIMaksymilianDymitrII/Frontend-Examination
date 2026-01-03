import Wheel from "../assets/racing.png";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const ForgotPassword = () => {
  const { theme, themeColors } = useTheme();

  const [email, setEmail] = useState(``);
  const [message, setMessage] = useState(``);

  const submitEmail = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/forgotpassword`, {
        email,
      });
      setMessage(
        `Check your email for reset link. Token: ${res.data.resetToken}`
      );
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.error || `Something went wrong`);
    }
  };

  return (
    <main
      className={`flex justify-center items-center w-screen h-[870px] ${themeColors.bg}`}
    >
      <section
        className={`${themeColors.bgWidget} ${themeColors.border} border rounded-2xl p-3 font-semibold w-[320px] ${themeColors.text}`}
      >
        <div className="text-center p-8 text-2xl flex flex-col items-center justify-center gap-3">
          <img
            src={Wheel}
            alt="Logo"
            className={`size-20 ${theme === "Dark" ? "invert" : ""}`}
          />
          <h1>Forgot Password</h1>
        </div>

        <div className="flex flex-col gap-3 px-2">
          <div className="flex flex-col gap-1">
            <h2>Email Address</h2>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-2 ${themeColors.elevated} ${themeColors.border} border rounded-lg ${themeColors.text}`}
            />
          </div>

          <button
            onClick={submitEmail}
            className="w-full my-2 bg-indigo-700 rounded-lg cursor-pointer p-2 hover:bg-indigo-600 text-white"
          >
            Verify Email
          </button>

          {message && (
            <p className="text-red-500 text-center mt-2">{message}</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
