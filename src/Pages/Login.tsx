import Wheel from "../assets/racing.png";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const loginLink: string = `http://localhost:5000/login`;
const googleLogo: string = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEkUlEQVR4nO2Zb0wbZRzHn3taesUtRpOJYbo/DoQM5c/GMgryzxkYxbGBiQsbNBCEFGaIY8zCCuaUMSiQAQMGQWAgcSY2GeuNuzpc8NqNvRoCItE3841Dthj3ToNzbX+mVRBI197Zo2VJv8n3XZ+nn89dn6dPrwj5448/HgcoJIWqgGIoxywU4HuQTfwJSsIKBxBAKgJIQzbIJhZBhX+BE/g6VAUU2ccgXwc0UgWU4tvwNmGBJASCqiQsoMa3QRsQ433wOlk4qPEsvCkQ2llTEUAxnoEaFOIdeA3RCumEzWPwtT2IrHCK0K0f+HkUCMX4B9HBk9b0PTwNFJKJC9+NngcVfrDu8En/toJoFw9+EMnhOPGr1+DLCE40eIeAGn/vPXgsMvyHRIfgrbEMT0IlroUmaQpQaAtQKAjOSN6C05hy7Db21zgbW4pN4sI3kyGQQVh5g5+W9PJZfEChZ+ADydAqkVKR4R1vVIHv8IIvwPNwDr0oeP4aFAJ5+P76wJvl22CcfAQaCUCyC/gSPAV6JEEbLWAmdWAmwdHeAIB0wvmV35DweiQBs2x+WcDeURmACv8Hn0lYoAK9hDZiwCSPXwW/VI4E0En/ObuclPSjjRowybROBZY6FPAAyhGJNmrATF5xKWCSdQiZL1gzC2I0XDthO9rUd9e9gImccynAkRm+EAjWzMIbddcW+Qg8dCMQ6iuB3TW3rHwEHrkWQJt9JbCjehKeaoHtVd+C5x+hm7IwXwns1t60Pd2L+JNRHovYTI642UY7fSVwRDc8z0NAduZJ8A+5Z6Geif/jvF4RiEROy3D+puiPvrG4Eii/0DjqXoALVDiDnx0PBhWthENXs6HDGHtJbIGTnfX97u6Arq/iuHsBQBjMsntL4DYzCfRYOGQbDjvg7c2jlZaL11/bJhZ8W496Z2SNyeoK/vVas4XiKH5P88BENtrhfzdthrNMwjL4ylaPJi9wXIrHjwcpjpIeafxswd3VL2lrm+A9KXCBL98df+GvEjrdKfxSP2YTZjyRoDhKmt/SM+d2/6+egsbuylhBkzcwihlX8CvvRP/X4VuFwvfeiNhe1lX3E5/d51hz75zQ+RE9FvZKPq208pHIp5WWzq/2DlCDKXJ38w6PRW1qZ/b15RmU1pyRHDja2uH2FEp9ekrQl+dyutmY1iweAitFGljFdJdxL6VnIw5cGdsVdJkL2zJgjEq8aNxTV8ckTNpfs3JM1kgOFPZQsLXqO6cC77c3dSNPomPjpvkKeNKiwXLYWX1nFfy7TQM/Ik+j10fINHTqfW9IFH5RCJG1Jgd8ev2Xv53o6hJ0cHxiOG7HczVM4oI3JI7pc0HVemGeGq4MEgV+hYT8LBM/K2RN/J+eYxXTRmPo+v3m7jNGNecaMq2iX3lDprWXjWlG3sgwvSe0gY2beseQ5TF4ztXDjqt++caru5C3MzQWGdvM7L9VZDj4WCh4AZ3xuJGJm/icifb+n3xrowck6WeiC1uN+0a1TOLPajptUWVQWu13yH4IzDVk2tSGtMWqa8nzLex+ts8YU2Afg/zxxx/kaf4GzSVnCicBYF0AAAAASUVORK5CYII=`;

const LogIn = () => {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const nav = useNavigate();
  const { theme, themeColors } = useTheme();

  const login = async () => {
    try {
      const res = await axios.post(loginLink, { email, password });
      localStorage.setItem(`token`, res.data.token);
      nav(`/dashboard`);
    } catch (error) {
      console.error(error);
    }
  };

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const { email, name } = res.data;
        const backendRes = await axios.post(`http://localhost:5000/google-login`, { email, name });
        localStorage.setItem(`token`, backendRes.data.token);
        nav(`/dashboard`);
      } catch (err) {
        console.error(err);
      }
    },
    onError: () => console.log(`Login Failed`),
  });

  const logoClass = `size-20 ${theme === 'Dark' ? 'invert' : ''}`;
  const googleLogoClass = `size-8 ${theme === 'Dark' ? 'brightness-1000 grayscale ' : 'brightness-0 '}`;

  return (
    <div className={`flex justify-center items-center w-screen h-[870px] ${themeColors.bg} ${themeColors.text}`}>
      <div className={`${themeColors.bgWidget} ${themeColors.border} border rounded-2xl p-3 font-semibold`}>
        <div className={`text-center p-8 text-2xl flex flex-col items-center justify-center gap-3`}>
          <img src={Wheel} alt={`Logo`} className={logoClass} />
          <h1 className={`${themeColors.text}`}>Log in to your account</h1>
        </div>
        <div className={`flex flex-col gap-3 px-2`}>
          <div className={`flex flex-col gap-3`}>
            <div className={`flex flex-col gap-1`}>
              <h2 className={`${themeColors.text}`}>Email Address</h2>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type={`text`}
                className={`w-full pl-2 ${themeColors.elevated} ${themeColors.border} border rounded-lg ${themeColors.text}`}
              />
            </div>
            <div className={`flex flex-col gap-1`}>
              <div className={`flex justify-between`}>
                <h2 className={`${themeColors.text}`}>Password</h2>
                <p className={`${themeColors.accent} hover:${themeColors.textMuted}`}>
                  <Link to={`/forgotpassword`}>Forgot Password?</Link>
                </p>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={`password`}
                className={`w-full pl-2 ${themeColors.elevated} ${themeColors.border} border rounded-lg ${themeColors.text}`}
              />
            </div>
          </div>
          <button
            onClick={login}
            className={`w-full bg-indigo-700 rounded-lg cursor-pointer p-2 hover:bg-indigo-600 text-white`}
          >
            Log In
          </button>
          <hr className={`${themeColors.border} rounded-xl`} />
          <div className={`flex justify-center items-center w-full`}>
            <button
              onClick={() => googleAuth()}
              className={`${themeColors.elevated} rounded-lg p-2 hover:${themeColors.bgHover} cursor-pointer flex justify-center items-center w-full`}
            >
              <img src={googleLogo} alt={`google-logo`} className={googleLogoClass} />
            </button>
          </div>
        </div>
        <div className={`p-3 text-center flex justify-around`}>
          <p className={`${themeColors.text}`}>Not a member?</p>
          <p className={`${themeColors.accent} hover:${themeColors.textMuted}`}>
            <Link to={`/signin`}>Become our Member!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
