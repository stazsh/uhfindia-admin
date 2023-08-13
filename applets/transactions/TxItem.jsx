import React from "react";
import ConditionalMarquee from "../../components/ConditionalMarquee";
import { FiExternalLink } from "react-icons/fi";
import { uid } from "uid";
import { Completed, Failed, Pending } from "../../components/StatusShields";
import { getColumnConfig } from "../../ui-config/TxTable.config";

function TxItem(listItem) {
  const columnConfig = getColumnConfig();

  const statusShield = {
    pending: <Pending />,
    failed: <Failed />,
    completed: <Completed />,
  };

  return (
    <div className="w-full flex flex-row h-16 cursor-pointer hover:bg-slate-100 text-tertiary group hover:text-primary transition-colors duration-200">
      <div
        style={{ width: `${columnConfig[0].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[0].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[0].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        style={{ width: `${columnConfig[1].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[1].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[1].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
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
              {listItem[columnConfig[2].fieldName].toLowerCase()}
            </a>
            <FiExternalLink
              fontSize={12}
              className="opacity-0 ml-1 group-hover:opacity-100 inline-block"
            />
          </span>
        </ConditionalMarquee>
      </div>

      <div
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
        style={{ width: `${columnConfig[4].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[4].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[4].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        style={{ width: `${columnConfig[5].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[5].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          ₹ {listItem[columnConfig[5].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        style={{ width: `${columnConfig[6].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[6].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {new Date(listItem[columnConfig[6].fieldName]).toLocaleString(
            "en-in"
          )}
        </ConditionalMarquee>
      </div>

      <div
        style={{ width: `${columnConfig[7].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"vapp-list-iten-" + columnConfig[7].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {statusShield[listItem[columnConfig[7].fieldName]]}
        </ConditionalMarquee>
      </div>
    </div>
  );
}

export default TxItem;
