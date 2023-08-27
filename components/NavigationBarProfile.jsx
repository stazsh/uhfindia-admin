import "../styles/navigation-bar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { BiErrorCircle, BiLogOutCircle } from "react-icons/bi";
import { roleSelector } from "./RoleShields";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showConfirmDialog,
  UTIL_showLoadingDialog,
} from "../utils/muiDialogUtils";
import { DialogContext } from "../context/DialogContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosConfig";

function NavigationBarProfile() {
  const { userContextObj } = useContext(UserContext);
  const { setShowDialog } = useContext(DialogContext);
  const navigate = useNavigate();

  return (
    <div
      onClick={async () => {
        UTIL_showConfirmDialog(
          setShowDialog,
          "Are you sure you want to sign out?",
          async () => {
            UTIL_showLoadingDialog(setShowDialog, "Signing out...");

            try {
              console.log(
                await axiosInstance.post("/session/logout", undefined, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
                  },
                })
              );
              navigate("/session/signin");
              UTIL_hideDialog(setShowDialog);
            } catch (e) {
              console.error(e);

              if (e.response.status === 403) {
                return navigate("/session/signin");
              }

              UTIL_showAlertDialog(
                setShowDialog,
                <>
                  <div className="flex flex-row flex-start">
                    <BiErrorCircle
                      fontSize={30}
                      className="inline-block mr-4"
                    />
                    An unexpected error occured
                  </div>
                  <div>
                    <div className="m-2" />
                    <code>{e.response.data.message || e.message}</code>
                  </div>
                </>,
                () => navigate(-1)
              );
            }
          },
          () => {}
        );
      }}
      className="p-3 text-white h-full cursor-pointer group ring-white ring-0 focus:ring-1"
    >
      <div className="rounded-full bg-secondary-shade-nav hover:bg-focus-ring-nav transition h-full flex flex-row items-center w-fit ">
        <img
          src={userContextObj.profurl}
          className="rounded-full h-full object-cover aspect-square"
        />
        <div className="font-bold flex-col pl-3">
          <div className="text-xs whitespace-nowrap flex flex-row space-x-1">
            <span>{userContextObj.name}</span>
            <span>{roleSelector[userContextObj.role]}</span>
          </div>
          <div className="text-xs pb-0.5 text-secondary-nav w-full overflow-hidden h-full">
            {userContextObj.email}
          </div>
        </div>
        <span className="text-tertiary-nav group-hover:text-secondary-nav transition-colors cursor-pointer p-2">
          <BiLogOutCircle fontSize={20} className="m-2" />
        </span>
      </div>
    </div>
  );
}

export default NavigationBarProfile;
