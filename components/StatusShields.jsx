import { RiCloseCircleFill, RiCheckboxCircleFill } from "react-icons/ri";
import { HiClock } from "react-icons/hi";

export const statusShieldSelector = {
  approved: <Approved />,
  completed: <Completed />,
  rejected: <Rejected />,
  failed: <Failed />,
  pending: <Pending />,
  _true: <Granted />,
  _false: <Denied />,
};

export function Granted() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-green-500 bg-green-50 text-xs">
      <RiCheckboxCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Granted</span>
    </div>
  );
}

export function Denied() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-red-500 bg-red-50 text-xs">
      <RiCloseCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Denied</span>
    </div>
  );
}

export function Approved() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-green-500 bg-green-50 text-xs">
      <RiCheckboxCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Approved</span>
    </div>
  );
}

export function Completed() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-green-500 bg-green-50 text-xs">
      <RiCheckboxCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Completed</span>
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

export function Failed() {
  return (
    <div className="font-semibold h-fit w-fit px-2 py-0.5 flex place-items-center rounded-full text-red-500 bg-red-50 text-xs">
      <RiCloseCircleFill fontSize={15} className="inline-block mr-2" />
      <span>Failed</span>
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
