import React from "react";
import SectionHeader from "../../components/SectionHeader";
import UContainer from "./UContainer";

export default function UVolunteers() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Users.Volunteer"}
        subtitle="View and manage your volunteers."
      />

      <UContainer onlyRenderRole={"volunteer"} />
    </div>
  );
}
