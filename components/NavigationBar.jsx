import "../styles/navigation-bar.css";
import {
  FaBell,
  FaCalendarAlt,
  FaChessBishop,
  FaChevronDown,
  FaEnvelope,
  FaFlask,
  FaQuestionCircle,
  FaSearch,
} from "react-icons/fa";
import NavigationBarProfile from "./NavigationBarProfile";
import LOGO from "../assets/logo-min.png";
import { BiGlobe } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";

function NavigationBar({ children }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="top-navbar"
        className="h-[5rem] w-full bg-black flex flex-row justify-between"
      >
        <div className="flex place-items-center pl-2 w-[35%]">
          <div className="flex place-items-center">
            <img src={LOGO} className="inline-block mr-3 w-10" />
            <span className="text-white text-2xl">
              United
              <span className="font-black"> H.O.P.E.</span>
              Foundation
            </span>
          </div>
          {/* separator */}
          <div className="h-1/2 w-[2px] bg-secondary-shade-nav mx-5" />
          <div className="space-x-2 flex flex-row">
            <span className="text-tertiary-nav text-sm flex place-items-center hover:text-secondary-nav select-none transition-colors cursor-pointer hover:bg-secondary-shade-nav p-1 px-2 rounded-md">
              <FaQuestionCircle fontSize={16} className="inline-block" />
              <span>&nbsp;Help</span>&nbsp;
              <FaChevronDown fontSize={10} />
            </span>
            <span className="text-tertiary-nav text-sm hover:text-secondary-nav select-none transition-colors cursor-pointer hover:bg-secondary-shade-nav p-1 px-2 rounded-md flex place-items-center">
              <BiGlobe fontSize={16} className="inline-block" />
              <span>&nbsp;Visit Homepage</span>
            </span>
          </div>
        </div>
        <div className="space-x-4 flex items-center justify-end">
          {[
            { label: "Home", hyperlink: "/lol" },
            { label: "Activities", hyperlink: "/lmao" },
            { label: "About", hyperlink: "/lmfao" },
            { label: "Our Work", hyperlink: "/hahahaha" },
            { label: "Gallery", hyperlink: "/HaHAAHAHAHAAAAHHAHAa" },
            { label: "EULA", hyperlink: "/AAAAAAAAAAAAAAAAAAAAAA" },
          ].map((item) => (
            <a
              href={item.hyperlink}
              className="text-secondary-nav hover:border-b border-white group hover:text-primary-nav transition-colors duration-300"
            >
              {item.label}
              <span className="opacity-0 group-hover:opacity-100 duration-300">
                <FiExternalLink fontSize={12} className="inline-block ml-2" />
              </span>
            </a>
          ))}
          <NavigationBarProfile />
        </div>
      </div>
      <div className="flex-grow relative">{children}</div>
    </div>
  );
}

export default NavigationBar;
