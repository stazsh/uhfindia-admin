import React from "react";
import SectionHeader from "../../components/SectionHeader";
import UContainer from "./UContainer";

function UCommunity() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Users.Community"}
        subtitle="View and manage your community users."
      />

      <UContainer onlyRenderRole={"community"} />
    </div>
  );
}

export default UCommunity;
