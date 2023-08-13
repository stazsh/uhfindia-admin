import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import SubsectionHeader from "../../components/SubsectionHeader";
import CampaignItem from "./CampaignItem";
import { uid } from "uid";
import { getFundraisersList } from "../../static/FundraisersList";

function FundraiserCampaignsContainer({ className }) {
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
            {getFundraisersList().map((item) => (
              <CampaignItem key={uid(10)} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundraiserCampaignsContainer;
