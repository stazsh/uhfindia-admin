import SubsectionHeader from "../../components/SubsectionHeader";
import { IoPeopleOutline } from "react-icons/io5";
import { getColumnConfig } from "../../ui-config/VAppTable.config";
import ApplicationListItem from "./ApplicationListItem";
import { vAppList } from "../../static/VAppList";
import VAppListHeaderItem from "./VAppListHeaderItem";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DialogContext } from "../../context/DialogContext";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { axiosInstance } from "../../api/axiosConfig";
import { BiErrorCircle } from "react-icons/bi";

function VAppListContainer({ className }) {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    async function getVApplications() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading feedback list...");
        const res = await axiosInstance.get("/vapplications", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        console.log(res.data.payload);

        UTIL_hideDialog(setShowDialog);
        setApplicationList(res.data.payload);
      } catch (e) {
        console.error(e);
        UTIL_showAlertDialog(
          setShowDialog,
          <>
            <div className="flex flex-row flex-start">
              <BiErrorCircle fontSize={30} className="inline-block mr-4" />
              An unexpected error occured
            </div>
            <div>
              <div className="m-2" />
              <code>{e.response.data.message || e.message}</code>
            </div>
          </>
        );
      }
    }

    getVApplications();
  }, []);

  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Volunteer Applications"}
          className="p-5"
        />

        <div className="list-header-container shrink-0 text-primary border-b h-12 divide-x flex flex-row border-boundary px-5 py-2 text-sm font-bold">
          {getColumnConfig().map((item) => (
            <VAppListHeaderItem key={item.label} {...item} />
          ))}
        </div>

        <div className="relative flex-grow shrink-0">
          <div
            id="list-parent"
            className="absolute w-full h-full divide-y overflow-auto px-5"
          >
            {applicationList.map((item) => (
              <ApplicationListItem
                key={uid(10)}
                {...item}
                onClick={() =>
                  navigate("/dashboard/volunteer-applications/" + item._id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VAppListContainer;
