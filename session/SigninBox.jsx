import { Checkbox } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { VscDebugRestart } from "react-icons/vsc";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { PiWarningBold } from "react-icons/pi";
import "../styles/signin.css";
import { miscNetError } from "../utils/miscNetworkError";
import { UserContext } from "../context/UserContext";
import { CgGlobeAlt } from "react-icons/cg";

function SigninBox() {
  const emailRef = useRef();
  const pwdRef = useRef();

  const navigate = useNavigate();
  const [loginLoadState, setLoginLoadState] = useState(null);
  const { _, setUserContextObj } = useContext(UserContext);

  const handleLoginClick = async (e) => {
    try {
      setLoginLoadState(true);

      const res = await axios({
        method: "post",
        url: "https://lipsum.jayantapandit.me/v1/crm/session/login",
        data: {
          email: emailRef.current.value,
          password: pwdRef.current.value,
        },
      });

      if (res.data.success) {
        setUserContextObj(res.data.user_obj);
        localStorage.setItem("crm_jwt", res.data.jwt);
        localStorage.setItem("crm_jwt_ref", res.data.jwt_refresh);

        // TODO: timeout added for demonstrative purposes only, remove in production
        setTimeout(() => navigate("/dashboard/home"), 3000);
      }
    } catch (err) {
      console.error(err);

      if (isAxiosError(err)) {
        const statusCode = err.response.status;

        switch (statusCode) {
          case 404:
            setLoginLoadState(false);
            pwdRef.current.value = "";
            break;

          case 403:
            setLoginLoadState(false);
            pwdRef.current.value = "";
            emailRef.current.value = "";
            break;

          default:
            miscNetError(() => setLoginLoadState(null));
            break;
        }
      } else {
        miscNetError(() => setLoginLoadState(null));
      }
    }
  };

  return (
    <div className="w-[50%]">
      <div className="w-full text-3xl mb-9 text-primary">Sign-in</div>

      <label
        className="block mb-3 font-semibold text-slate-500"
        htmlFor="input-email"
      >
        Email address
      </label>
      <input
        tabIndex={1}
        className="mb-7 outline-none text-slate-900 font-medium focus:ring-2 rounded-sm p-2 px-3 border transition-all border-boundary w-full ring-blue-500"
        type="text"
        name="email"
        ref={emailRef}
        id="inp-email"
        placeholder="your@email.duh"
      />

      <label
        className="block mb-3 font-semibold text-slate-500"
        htmlFor="input-pass"
      >
        Password
      </label>
      <div className="w-full h-fit relative">
        <input
          tabIndex={1}
          className="outline-none text-slate-900 focus:ring-2 rounded-sm p-2 pl-3 pr-20 transition-all border border-boundary w-full ring-blue-500"
          type="password"
          name="password"
          ref={pwdRef}
          id="inp-pass"
          placeholder="Your password"
        />
        <div className="text-neutral-500 flex items-center justify-center absolute  mx-2 right-0 top-1/2 -translate-y-1/2 w-fit h-fit">
          <VscDebugRestart
            tabIndex={1}
            onClick={() => (pwdRef.current.value = "")}
            fontSize={22}
            className="outline-none cursor-pointer inline-block mr-3 hover:text-blue-500 transition-all"
          />
          <HiOutlineEyeOff
            tabIndex={1}
            onClick={(e) => {
              const field = document.getElementById("inp-pass");

              field.type = field.type === "password" ? "text" : "password";
            }}
            fontSize={22}
            className="cursor-pointer outline-none inline-block hover:text-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="place-self-end text-slate-500 text-sm mt-2 hover:text-blue-400 font-semibold transition-colors cursor-pointer">
        Forgot password?
      </div>

      <div className="w-full flex items-center flex-row mt-3 text-slate-500 cursor-pointer">
        <Checkbox className="inline-block -translate-x-2" />
        <span className="-translate-x-2">Remember me</span>
      </div>

      <button
        onClick={handleLoginClick}
        className="w-full text-white rounded-lg p-2 mt-5 transition-colors outline-none font-bold bg-[#5431c7] hover:bg-[#5e3ccd] active:bg-[#3a218c]"
      >
        {loginLoadState === null && (
          <FiLogIn fontSize={20} className="mr-2 inline-block w-6" />
        )}
        {loginLoadState === true && (
          <AiOutlineLoading
            fontSize={20}
            className="mr-2 inline-block w-6 infinite-rotation"
          />
        )}
        {loginLoadState === false && (
          <PiWarningBold
            fontSize={20}
            className="mr-2 inline-block w-6 text-red-400"
          />
        )}
        Login
      </button>

      <div className="mt-5 text-sm text-slate-700">
        Don't have an account?{" "}
        <a
          className="text-blue-600 hover:text-blue-400 font-semibold transition-colors underline"
          href="/session/buy"
        >
          Apply now
        </a>
      </div>

      <div className="flex mb-3 mt-6 flex-row items-center">
        <div className="h-[2px] shrink-0 flex-grow bg-slate-100" />
        <span className="px-3 text-slate-300 text-xs uppercase font-bold">
          Admin Panel
        </span>
        <div className="my-5 h-[2px] shrink-0 flex-grow bg-slate-100" />
      </div>

      <div className="flex flex-row items-center justify-center space-x-8 text-slate-400">
        <div className="space-x-2 flex flex-row items-center">
          <CgGlobeAlt fontSize={20} />
          <span className="text-xl">
            <span className="font-black">UHFIndia</span>.org
          </span>
        </div>
      </div>
    </div>
  );
}

export default SigninBox;
