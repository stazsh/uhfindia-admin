import React from "react";
import SectionHeader from "../../components/SectionHeader";
import FundraiserCampaignsContainer from "./FundraiserCampaignsContainers";
import { Route, Routes, useNavigate } from "react-router-dom";
import FundraisingForm from "./FundraisingForm";
import NativeButton from "../../components/NativeButton";
import { BiPlus } from "react-icons/bi";

function Fundraising() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <div className="flex flex-row">
              <SectionHeader
                title={"Fundraising"}
                subtitle={
                  "Manage all your fundraising campaigns from one place."
                }
              />

              <NativeButton
                IconType={BiPlus}
                text={"Create new fundraiser"}
                onClick={() => navigate("/dashboard/fundraising/create")}
                type={"green"}
              />
            </div>

            <FundraiserCampaignsContainer />
          </div>
        }
      />

      <Route path="/create" element={<FundraisingForm createMode />} />

      <Route path="/:id" element={<FundraisingForm />} />
    </Routes>
  );
}

export default Fundraising;
