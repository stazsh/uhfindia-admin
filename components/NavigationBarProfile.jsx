import { FaArrowDown, FaCaretDown, FaChevronDown } from "react-icons/fa";
import SPIDERMAN from "../assets/spiderman.jpg";
import "../styles/navigation-bar.css";

function NavigationBarProfile() {
  return (
    <div className="p-4 text-white h-full cursor-pointer group ring-white ring-0 focus:ring-1">
      <div className="rounded-full bg-secondary-shade-nav hover:bg-focus-ring-nav transition h-full flex flex-row items-center w-fit ">
        <img
          src={SPIDERMAN}
          className="rounded-full h-full object-cover aspect-square"
        />
        <div className="font-bold flex-col pl-2">
          <div className="text-xs whitespace-nowrap">Spiderman</div>
          <div
            id="nav-profile-email"
            className="text-xs text-secondary-nav w-full overflow-hidden h-full"
          >
            spiderman@gmail.in
          </div>
        </div>
        <span className="text-tertiary-nav group-hover:text-secondary-nav transition-colors cursor-pointer p-2">
          <FaChevronDown fontSize={10} />
        </span>
      </div>
    </div>
  );
}

export default NavigationBarProfile;
