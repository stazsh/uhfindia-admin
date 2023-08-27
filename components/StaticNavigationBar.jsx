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
        <div className="flex place-items-center pl-2">
          <div className="flex place-items-center overflow-visible">
            <img src={LOGO} className="inline-block mr-3 w-16" />
            <span className="text-white text-2xl mob:text-lg">
              United
              <span className="font-black"> H.O.P.E. </span>
              <span className="mob:block">Foundation</span>
            </span>
          </div>
        </div>

        <div
          id="hyperlwinks"
          className="mx-[3rem] mob:hidden space-x-8 transition flex flex-row place-items-center"
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
