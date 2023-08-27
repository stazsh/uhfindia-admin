import React, { useContext, useEffect, useState } from "react";
import UHeaderItem from "./UHeaderItem";
import SubsectionHeader from "../../components/SubsectionHeader";
import { IoPeopleOutline } from "react-icons/io5";
import { getColumnConfig } from "../../ui-config/UTable.config";
import { axiosInstance } from "../../api/axiosConfig";
import UItem from "./UItem";
import { uid } from "uid";
import { UTIL_showAlertDialog } from "../../utils/muiDialogUtils";
import { DialogContext } from "../../context/DialogContext";
import { BiErrorCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function UContainer({ className, onlyRenderRole }) {
  const [uList, setUList] = useState([]);
  const { setShowDialog } = useContext(DialogContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axiosInstance.get("/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
          params: {
            filter: {
              role: onlyRenderRole,
            },
          },
        });
        console.log(res.data);
        setUList(res.data.payload);
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

    getUsers();
  }, []);

  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={String(onlyRenderRole).toLocaleUpperCase()}
          className="p-5"
        />

        <div className="list-header-container shrink-0 text-primary border-b h-12 divide-x flex flex-row border-boundary px-5 py-2 text-sm font-bold">
          {getColumnConfig().map((item) => (
            <UHeaderItem key={item.label} {...item} />
          ))}
        </div>

        <div className="relative flex-grow shrink-0">
          <div
            id="list-parent"
            className="absolute w-full h-full divide-y overflow-auto px-5"
          >
            {uList.map((item) =>
              item.role === onlyRenderRole ? (
                <UItem
                  onClick={() =>
                    navigate(
                      "/dashboard/users/" + onlyRenderRole + "/" + item._id
                    )
                  }
                  key={uid(10)}
                  {...item}
                />
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UContainer;
