import React, { useContext } from "react";
import SectionHeader from "../../components/SectionHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import UForm from "./UForm";
import { UFormUpdate } from "./UFormUpdate";
import NativeButton from "../../components/NativeButton";
import { FiPlus } from "react-icons/fi";
import UContainerMui from "./UContainerMui";

function UCommunity() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <div className="flex flex-row mob:flex-col">
              <SectionHeader
                title={"Users.Community"}
                subtitle="View and manage your community users."
              />
              <div className="flex flex-row justify-end mob:mt-4">
                <NativeButton
                  IconType={FiPlus}
                  text={"Add new"}
                  type={"green"}
                  onClick={() => navigate("/dashboard/users/community/create")}
                />
              </div>
            </div>
            <UContainerMui onlyRenderRole={"community"} />
          </div>
        }
      />
      <Route path={"/create"} element={<UForm createRole={"community"} />} />
      <Route path={"/:id"} element={<UFormUpdate updateRole={"community"} />} />
    </Routes>
  );
}

export default UCommunity;
