import React, { useEffect } from "react";
import "../styles/signin.css";
import SigninBox from "./SigninBox";
import { GiFizzingFlask } from "react-icons/gi";
import LOGO from "../assets/logo-min.png";

function SignIn() {
  useEffect(() => {
    const imageBox = document.getElementById("signin-image-box");

    const applyParallax = (e) => {
      let _w = window.innerWidth / 2;
      let _h = window.innerHeight / 2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let _depth = `${50 - (_mouseY - _h) * 0.05}% ${
        50 - (_mouseX - _w) * 0.05
      }%`;
      imageBox.style.backgroundPosition = _depth;
    };

    document
      .querySelector("#main-parent3")
      .addEventListener("mousemove", applyParallax);
  }, []);

  return (
    <div id="main-parent3" className="w-full h-full flex flex-row">
      <div
        id="parent3"
        className="w-1/2 h-full relative overflow-hidden mob:hidden"
      >
        <div
          className="flex flex-col flex-grow justify-between w-full p-9 text-white h-full z-10"
          id="signin-image-box"
        >
          <div className="flex items-center text-shadow">
            <img src={LOGO} className="inline-block mr-5 w-20" />
            <span className="text-2xl font-mono">
              <span className="font-black">uhfindia</span>
              .org
            </span>
          </div>

          <div className="text-sm flex flex-row justify-between items-center">
            <div>
              ©{" "}
              <span className="font-bold">
                2023 United H.O.P.E. Foundation.
              </span>{" "}
              All rights reserved.
              <br />{" "}
              <a href="/legal/eula" className="underline">
                EULA
              </a>{" "}
              |{" "}
              <a href="/docs/privacy-policy" className="underline">
                Privacy Policy
              </a>{" "}
              <br />
              <span className="font-bold">Contact:</span>{" "}
              <a
                href="mailto:unitedhopefoundationindia@gmail.com"
                className="hover:underline"
              >
                unitedhopefoundationindia@gmail.com
              </a>{" "}
              | <span className="font-bold">Phone:</span> +91 (123) 456-7890
            </div>
            <GiFizzingFlask fontSize={50} />
          </div>
        </div>
      </div>
      <div className="w-1/2 mob:w-full h-full flex flex-col items-center justify-center">
        <SigninBox />
      </div>
    </div>
  );
}

export default SignIn;
