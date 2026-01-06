import Wheel from "../assets/racing.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const signinLink: string = "http://localhost:5000/signin";

const SignIn = () => {
  const { themeColors, theme } = useTheme();

  const [err, setErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const collectInfo = [
    { name: "name", label: "Name", type: "text" },
    { name: "lastname", label: "Last Name", type: "text" },
    { name: "email", label: "Email Address", type: "text" },
    { name: "password", label: "Password", type: "text" },
  ];

  const nav = useNavigate();

  const SignInProtocol = async () => {
    try {
      const res = await axios.post(signinLink, formData);
      localStorage.setItem("token", res.data.token);
      nav("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`flex justify-center items-center w-screen h-[870px] ${themeColors.bg}`}>
      <div className={`rounded-2xl p-3 font-semibold w-[360px] ${themeColors.bgWidget} border ${themeColors.border}`}>
        <div className="text-center p-8 text-2xl flex flex-col items-center justify-center gap-3">
          <img src={Wheel} alt="Logo" className={`${theme === "Dark" ? "invert" : ""} h-20 w-20`} />
          <h1 className={themeColors.text}>Create Account</h1>
        </div>
        <div className="flex flex-col gap-3 px-2">
          {collectInfo.map((info) => (
            <div key={info.name} className="flex flex-col gap-1">
              <h2 className={themeColors.text}>{info.label}</h2>
              <input
                name={info.name}
                type={info.type}
                onChange={handleChange}
                value={formData[info.name as keyof typeof formData]}
                className={`w-full pl-2 rounded-lg border ${themeColors.elevated} ${themeColors.border} ${themeColors.text}`}
              />
            </div>
          ))}

          {err && <p className="text-center bg-red-600 rounded"> Please Fill in all Required Fields</p>}
          {emailErr && <p className="text-center bg-red-600 rounded"> Please Give a Valid Email</p>}

            <button
              onClick={() => {
                if (
                  !formData.name.trim() ||
                  !formData.lastname.trim() ||
                  !formData.email.trim() ||
                  !formData.password.trim()
                ) {
                  setErr(true)
                  return;
                } if (!formData.email.includes("@") || !formData.email.includes(".")) 
                {
                  setErr(false)
                  setEmailErr(true)
                  return
                }
                 else {
                  setErr(false)
                  setEmailErr(false)
                  nav("/")
                  SignInProtocol();
                }
              }}
              className="w-full text-white bg-indigo-700 rounded-lg cursor-pointer p-2 hover:bg-indigo-600 mt-2"
              >
              Create Account
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
