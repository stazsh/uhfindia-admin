import { FiExternalLink } from "react-icons/fi";
import "../styles/navigation-bar.css";
import { FaChevronDown, FaFlask, FaQuestionCircle } from "react-icons/fa";
import LOGO from "../assets/logo-min.png";
import { uid } from "uid";

function StaticNavigationBar({ children }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="top-navbar"
        className="h-[5rem] w-full bg-black flex flex-row justify-between"
      >
        <div className="flex place-items-center pl-2 w-[35%]">
          <div className="flex place-items-center overflow-visible">
            <img src={LOGO} className="inline-block mr-3 w-16" />
            <span className="text-white text-2xl">
              United
              <span className="font-black"> H.O.P.E. </span>
              Foundation
            </span>
          </div>
          {/* separator */}
          <div className="h-1/2 w-[2px] bg-secondary-shade-nav mx-5" />
          <div className="space-x-2 flex flex-row">
            <span className="text-tertiary-nav text-sm flex items-center justify-center hover:text-secondary-nav select-none transition-colors cursor-pointer hover:bg-secondary-shade-nav p-1 px-2 rounded-md">
              <FaQuestionCircle fontSize={16} className="inline-block" />
              <span>&nbsp;Support</span>&nbsp;
              <FaChevronDown fontSize={10} />
            </span>
          </div>
        </div>

        <div
          id="hyperlwinks"
          className="mx-[3rem] space-x-8 transition flex flex-row place-items-center"
        >
          {[
            { label: "Home", hyperlink: "/lol" },
            { label: "Activities", hyperlink: "/lmao" },
            { label: "About", hyperlink: "/lmfao" },
            { label: "Our Work", hyperlink: "/hahahaha" },
            { label: "Gallery", hyperlink: "/HaHAAHAHAHAAAAHHAHAa" },
            { label: "EULA", hyperlink: "/AAAAAAAAAAAAAAAAAAAAAA" },
          ].map((item) => (
            <a
              key={uid(10)}
              href={item.hyperlink}
              className="text-secondary-nav hover:border-b border-white group hover:text-primary-nav transition-colors duration-300"
            >
              {item.label}
              <span className="opacity-0 group-hover:opacity-100 duration-300">
                <FiExternalLink fontSize={12} className="inline-block ml-2" />
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}

export default StaticNavigationBar;
