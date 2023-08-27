import React, { useContext, useEffect, useState } from "react";
import SubsectionHeader from "../../components/SubsectionHeader";
import { IoPeopleOutline } from "react-icons/io5";
import { getColumnConfig } from "../../ui-config/Feedback.config";
import FeedbackHeaderItem from "./FeedbackHeaderItem";
import FeedbackItem from "./FeedbackItem";
import { uid } from "uid";
import { useNavigate } from "react-router-dom";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { DialogContext } from "../../context/DialogContext";
import { axiosInstance } from "../../api/axiosConfig";
import { BiErrorCircle } from "react-icons/bi";

function FeedbackContainer({ className }) {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [feedbacksList, setFeedbackList] = useState([]);

  useEffect(() => {
    async function getFeedbackList() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading feedback list...");
        const res = await axiosInstance.get("/feedback", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        UTIL_hideDialog(setShowDialog);
        setFeedbackList(res.data.payload);
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

    getFeedbackList();
  }, []);

  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Feedback List"}
          className="p-5"
        />

        <div className="list-header-container shrink-0 text-primary border-b h-12 divide-x flex flex-row border-boundary px-5 py-2 text-sm font-bold">
          {getColumnConfig().map((item) => (
            <FeedbackHeaderItem key={item.label} {...item} />
          ))}
        </div>

        <div className="relative flex-grow shrink-0">
          <div
            id="list-parent"
            className="absolute w-full h-full divide-y overflow-auto px-5"
          >
            {feedbacksList.map((item) => {
              return (
                <FeedbackItem
                  key={uid(10)}
                  onClick={() => navigate(`/dashboard/feedback/${item._id}`)}
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

export default FeedbackContainer;
