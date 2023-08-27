import React, { useContext } from "react";
import SectionHeader from "../../components/SectionHeader";
import UContainer from "./UContainer";
import NativeButton from "../../components/NativeButton";
import { FiPlus } from "react-icons/fi";
import { Route, Routes, useNavigate } from "react-router-dom";
import UForm from "./UForm";
import { UFormUpdate } from "./UFormUpdate";
import { UserContext } from "../../context/UserContext";

function UAdmininstrators() {
  const navigate = useNavigate();
  const { userContextObj } = useContext(UserContext);

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
              {userContextObj.role === "superadmin" && (
                <div>
                  <NativeButton
                    IconType={FiPlus}
                    text={"Add new admin"}
                    type={"green"}
                    onClick={() => navigate("/dashboard/users/admin/create")}
                  />
                </div>
              )}
            </div>

            <UContainer onlyRenderRole={"admin"} />
          </div>
        }
      />

      {userContextObj.role === "superadmin" && (
        <Route path="/create" element={<UForm createRole={"admin"} />} />
      )}
      <Route path="/:id" element={<UFormUpdate updateRole={"admin"} />} />
    </Routes>
  );
}

export default UAdmininstrators;
