import "../styles/navigation-bar.css";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import NavigationBarProfile from "./NavigationBarProfile";
import LOGO from "../assets/logo-min.png";
import { BiGlobe } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { uid } from "uid";

function NavigationBar({ children }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        id="top-navbar"
        className="h-[5rem] w-full bg-black flex flex-row justify-between mob:justify-center"
      >
        <div className="flex place-items-center pl-2 w-fit">
          <div className="flex place-items-center">
            <img
              src={LOGO}
              className="inline-block mr-3 w-10 mob:w-[3.25rem] rounded-full border-white border"
            />
            <span className="text-white text-2xl mob:hidden">
              United
              <span className="font-black"> H.O.P.E. </span>
              Foundation
            </span>
          </div>
        </div>
        <div className="space-x-4 mob:space-x-0 flex items-center justify-end">
          {[
            { label: "Homepage", hyperlink: "https://uhfindia.org" },
            { label: "Donate", hyperlink: "https://uhfindia.org/donate" },
            /* { label: "About", hyperlink: "/lmfao" },
            { label: "Our Work", hyperlink: "/hahahaha" },
            { label: "Gallery", hyperlink: "/HaHAAHAHAHAAAAHHAHAa" },
            { label: "EULA", hyperlink: "/AAAAAAAAAAAAAAAAAAAAAA" }, */
          ].map((item) => (
            <a
              key={uid(10)}
              href={item.hyperlink}
              className="text-secondary-nav mob:hidden hover:border-b border-white group hover:text-primary-nav transition-colors duration-300"
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
