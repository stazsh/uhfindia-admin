import { Route, Routes } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import VAppListContainer from "./VAppListContainer";
import ApplicationPreview from "./ApplicationPreview";

function VApplications() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <SectionHeader
              title={"Application Manager"}
              subtitle="Manage your volunteer application pool."
            />

            <VAppListContainer />
          </div>
        }
      />

      <Route path="/:id" element={<ApplicationPreview />} />
    </Routes>
  );
}

export default VApplications;
