import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import SubsectionHeader from "../../components/SubsectionHeader";

function FundraiserCampaignsContainers({ className }) {
  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Fundraising Campaigns"}
          className="p-5 border-b-boundary border-b"
        />

        <div className="relative flex-grow shrink-0">hehe</div>
      </div>
    </div>
  );
}

export default FundraiserCampaignsContainers;
