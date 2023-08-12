import { getColumnConfig } from "../../ui-config/VAppTable.config";
import ConditionalMarquee from "../../components/ConditionalMarquee";
import { FiExternalLink } from "react-icons/fi";
import { uid } from "uid";
import { Approved, Pending, Rejected } from "../../components/StatusShields";

function ApplicationListItem(listItem) {
  const columnConfig = getColumnConfig();

  const statusShield = {
    Pending: <Pending />,
    Rejected: <Rejected />,
    Approved: <Approved />,
  };

  return (
    <div className="w-full flex flex-row h-16 cursor-pointer hover:bg-slate-100 text-tertiary group hover:text-primary transition-colors duration-200">
      <div
        // VApp ID `_id`
        style={{ width: `${columnConfig[0].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[1].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[0].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        // name
        style={{ width: `${columnConfig[1].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[0].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[1].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        // email
        style={{ width: `${columnConfig[2].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[2].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          <span className="text-blue-500 hover:text-blue-600 hover:border-b border-blue-500 cursor-pointer">
            <a href={`mailto:${listItem.email}`}>
              {listItem[columnConfig[2].fieldName]}
            </a>
            <FiExternalLink
              fontSize={12}
              className="hidden ml-1 group-hover:inline-block"
            />
          </span>
        </ConditionalMarquee>
      </div>

      <div
        // phone
        style={{ width: `${columnConfig[3].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[3].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[3].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        // posted_at
        style={{ width: `${columnConfig[4].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[4].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {new Date(listItem[columnConfig[4].fieldName]).toLocaleString(
            "en-in"
          )}
        </ConditionalMarquee>
      </div>

      <div
        // application_status
        style={{
          width: `${columnConfig[5].width}%`,
          color:
            listItem[columnConfig[5].fieldName] === "Approved"
              ? "#00b959"
              : listItem[columnConfig[5].fieldName] === "Pending"
              ? "#ffaa00"
              : "red",
        }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[5].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {statusShield[listItem[columnConfig[5].fieldName]]}
        </ConditionalMarquee>
      </div>
    </div>
  );
}

export default ApplicationListItem;
