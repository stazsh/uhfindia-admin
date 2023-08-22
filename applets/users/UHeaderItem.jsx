import React from "react";
import { BiChevronDown } from "react-icons/bi";

function UHeaderItem({ label, width }) {
  const chevronDown = <BiChevronDown fontSize={15} className="inline-block" />;

  return (
    <div
      key={label}
      className="cursor-pointer px-2 flex flex-col justify-center h-full"
      style={{ width: `${width}%` }}
    >
      <div className="px-2 w-full hover:bg-slate-100 transition-colors rounded-md h-full flex flex-row items-center justify-start">
        <span className="inline-block">{label}</span>
        {chevronDown}
      </div>
    </div>
  );
}

export default UHeaderItem;
