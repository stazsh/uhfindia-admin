import SubsectionHeader from "../../components/SubsectionHeader";
import { IoPeopleOutline } from "react-icons/io5";
import { getColumnConfig } from "../../ui-config/VAppTable.config";
import ApplicationListItem from "./ApplicationListItem";
import { vAppList } from "../../static/VAppList";
import VAppListHeaderItem from "./VAppListHeaderItem";
import { uid } from "uid";

function VAppListContainer({ className }) {
  return (
    <div className={`flex-grow flex flex-col w-full ${className}`}>
      <div className="border border-boundary rounded-xl flex flex-col flex-grow">
        <SubsectionHeader
          icon={<IoPeopleOutline fontSize={20} />}
          label={"Volunteer Applications"}
          className="p-5"
        />

        <div className="list-header-container shrink-0 text-primary border-b h-12 divide-x flex flex-row border-boundary px-5 py-2 text-sm font-bold">
          {getColumnConfig().map((item) => (
            <VAppListHeaderItem key={item.label} {...item} />
          ))}
        </div>

        <div className="relative flex-grow shrink-0">
          <div
            id="list-parent"
            className="absolute w-full h-full divide-y overflow-auto px-5"
          >
            {vAppList.map((item) => (
              <ApplicationListItem key={uid(10)} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VAppListContainer;
