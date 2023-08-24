import React from "react";
import SectionHeader from "../../components/SectionHeader";
import UContainer from "./UContainer";
import NativeButton from "../../components/NativeButton";
import { FiPlus } from "react-icons/fi";
import { Route, Routes, useNavigate } from "react-router-dom";
import UForm from "./UForm";

function UAdmininstrators() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <div className="flex flex-row">
              <SectionHeader
                title={"User.Admin"}
                subtitle="View and manage your admin users."
              />
              <div>
                <NativeButton
                  IconType={FiPlus}
                  text={"Create new admin"}
                  type={"green"}
                  onClick={() =>
                    navigate("/dashboard/users/administrators/create")
                  }
                />
              </div>
            </div>

            <UContainer onlyRenderRole={"admin"} />
          </div>
        }
      />

      <Route path="/create" element={<UForm createRole={"admin"} />} />
    </Routes>
  );
}

export default UAdmininstrators;
