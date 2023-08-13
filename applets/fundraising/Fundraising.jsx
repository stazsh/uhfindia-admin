import React from "react";
import SectionHeader from "../../components/SectionHeader";
import FundraiserCampaignsContainer from "./FundraiserCampaignsContainers";

function Fundraising() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Fundraising"}
        subtitle={"Manage all your fundraising campaigns from one place."}
      />

      <FundraiserCampaignsContainer />
    </div>
  );
}

export default Fundraising;
