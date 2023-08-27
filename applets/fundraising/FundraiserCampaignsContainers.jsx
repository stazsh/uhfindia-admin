import React, { useContext, useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import SubsectionHeader from "../../components/SubsectionHeader";
import CampaignItem from "./CampaignItem";
import { uid } from "uid";
import { DialogContext } from "../../context/DialogContext";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { BiErrorCircle } from "react-icons/bi";
import { axiosInstance } from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function FundraiserCampaignsContainer({ className }) {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [fundraiserList, setFundraiserList] = useState([]);

  useEffect(() => {
    async function getFundraiserList() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading fundraiser list...");

        const res = await axiosInstance.get("/fundraisers", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        console.log(res);

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        }, 343);

        setFundraiserList(res.data.payload);
      } catch (e) {
        console.error(e);
        UTIL_showAlertDialog(
          setShowDialog,
          <>
            <BiErrorCircle fontSize={30} className="inline-block mr-4" />
            <span>An unexpected error occured</span>
          </>
        );
      }
    }

    getFundraiserList();
  }, []);

  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Fundraising Campaigns"}
          className="p-5 border-b-boundary border-b shadow-lg"
        />

        <div className="relative flex-grow shrink-0">
          <div className="absolute top-0 left-0 p-10 w-full h-full overflow-y-auto gap-10 grid grid-cols-3 auto-rows-min">
            {fundraiserList.map((item) => {
              return (
                <CampaignItem
                  onClick={() => navigate("/dashboard/fundraising/" + item._id)}
                  key={uid(10)}
                  {...item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundraiserCampaignsContainer;
