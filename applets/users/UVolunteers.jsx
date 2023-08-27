import React from "react";
import SectionHeader from "../../components/SectionHeader";
import UContainer from "./UContainer";
import NativeButton from "../../components/NativeButton";
import { FiPlus } from "react-icons/fi";
import UForm from "./UForm";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UFormUpdate } from "./UFormUpdate";

export default function UVolunteers() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <div className="flex flex-row">
              <SectionHeader
                title={"Users.Volunteer"}
                subtitle="View and manage your volunteers."
              />
              <div>
                <NativeButton
                  IconType={FiPlus}
                  text={"Add new volunteer"}
                  type={"green"}
                  onClick={() => navigate("/dashboard/users/volunteer/create")}
                />
              </div>
            </div>
            <UContainer onlyRenderRole={"volunteer"} />
          </div>
        }
      />
      <Route path="/create" element={<UForm createRole={"volunteer"} />} />
      <Route path="/:id" element={<UFormUpdate updateRole={"volunteer"} />} />
    </Routes>
  );
}
