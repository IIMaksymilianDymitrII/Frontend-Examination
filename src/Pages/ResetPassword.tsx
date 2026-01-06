import { useState } from "react";
import Wheel from "../assets/racing.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const ResetPassword = () => {
  const { theme, themeColors } = useTheme();

  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const submitNewPassword = async () => {
    if (!password) {
      setMessage("Password cannot be empty");
      return;
    }

    try {
      await axios.post("http://localhost:5000/resetpassword", {
        token,
        newPassword: password,
      });
      setMessage("Password updated successfully!");
      setTimeout(() => nav("/"), 2000);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <main
      className={`flex justify-center items-center w-screen h-[870px] ${themeColors.bg}`}
    >
      <section
        className={`${themeColors.bgWidget} ${themeColors.border} border rounded-2xl p-3 font-semibold ${themeColors.text}`}
      >
        <div className="text-center p-8 text-2xl flex flex-col items-center justify-center gap-3">
          <img
            src={Wheel}
            alt="Logo"
            className={`size-20 ${theme === "Dark" ? "invert" : ""}`}
          />
          <h1>Setup New Password</h1>
        </div>

        <div className="flex flex-col gap-3 px-2">
          <div className="flex flex-col gap-1">
            <h2>New Password</h2>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-2 ${themeColors.elevated} ${themeColors.border} border rounded-lg ${themeColors.text}`}
            />
          </div>

          <button
            onClick={submitNewPassword}
            className="w-full my-2 bg-indigo-700 rounded-lg cursor-pointer p-2 hover:bg-indigo-600 text-white"
          >
            Create New Password
          </button>

          {message && (
            <p className="text-center text-red-500">{message}</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
