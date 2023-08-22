import React from "react";
import SubsectionHeader from "../../components/SubsectionHeader";
import { IoPeopleOutline } from "react-icons/io5";
import { getColumnConfig } from "../../ui-config/Feedback.config";
import FeedbackHeaderItem from "./FeedbackHeaderItem";
import { feedbacksList } from "../../static/FeedbacksList";
import FeedbackItem from "./FeedbackItem";
import { uid } from "uid";

function FeedbackContainer({ className }) {
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
              return <FeedbackItem key={uid(10)} {...item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackContainer;
