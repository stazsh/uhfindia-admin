import {
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiAdminFill,
} from "react-icons/ri";
import { HiClock } from "react-icons/hi";

export const roleSelector = {
  superadmin: <Superadmin />,
  admin: <Admin />,
  volunteer: <Volunteer />,
};

export function Superadmin() {
  return (
    <div className="font-semibold h-fit w-fit px-2  flex place-items-center rounded-full text-red-500 bg-red-200 text-xs">
      <RiAdminFill fontSize={12} className="inline-block mr-2" />
      <span>Superadmin</span>
    </div>
  );
}

export function Admin() {
  return (
    <div className="font-semibold h-fit w-fit px-2  flex place-items-center rounded-full text-green-500 bg-green-200 text-xs">
      <RiCheckboxCircleFill fontSize={12} className="inline-block mr-2" />
      <span>Admin</span>
    </div>
  );
}

export function Volunteer() {
  return (
    <div className="font-semibold h-fit w-fit px-2  flex place-items-center rounded-full text-amber-500 bg-amber-200 text-xs">
      <HiClock fontSize={12} className="inline-block mr-2" />
      <span>Volunteer</span>
    </div>
  );
}
