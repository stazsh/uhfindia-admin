import { RiCloseCircleFill, RiCheckboxCircleFill } from "react-icons/ri";
import { HiClock } from "react-icons/hi";

export function Approved() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-green-500 bg-green-50 text-xs">
      <RiCheckboxCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Approved</span>
    </div>
  );
}

export function Rejected() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-red-500 bg-red-50 text-xs">
      <RiCloseCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Rejected</span>
    </div>
  );
}

export function Pending() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-amber-500 bg-amber-50 text-xs">
      <HiClock fontSize={15} className="inline-block mr-2" />
      <span>Pending</span>
    </div>
  );
}
