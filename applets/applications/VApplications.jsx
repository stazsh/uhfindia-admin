import SectionHeader from "../../components/SectionHeader";
import VAppListContainer from "./VAppListContainer";

function VApplications() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Application Manager"}
        subtitle="Manage your volunteer application pool."
      />

      <VAppListContainer />
    </div>
  );
}

export default VApplications;
