import React from "react";
import { getColumnConfig } from "../../ui-config/UTable.config";
import ConditionalMarquee from "../../components/ConditionalMarquee";
import { uid } from "uid";
import { FiExternalLink } from "react-icons/fi";

export default function UItem(listItem) {
  const columnConfig = getColumnConfig();

  return (
    <div className="w-full flex flex-row h-16 cursor-pointer hover:bg-slate-100 text-tertiary group hover:text-primary transition-colors duration-200">
      <div
        // pfp & name
        style={{ width: `${columnConfig[0].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"ulist-item-" + columnConfig[0].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          <div className="flex flex-row place-items-center">
            <img
              src={listItem.profurl}
              alt="User PFP"
              className="h-10 mr-5 aspect-square border-2 transition-all group-hover:border-4 border-blue-300 group-hover:border-blue-600 rounded-full object-cover"
            />
            {listItem[columnConfig[0].fieldName]}
          </div>
        </ConditionalMarquee>
      </div>

      <div
        // _id
        style={{ width: `${columnConfig[1].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"ulist-item-" + columnConfig[1].fieldName}
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
          itemType={"ulist-item-" + columnConfig[2].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          <span className="text-blue-500 hover:text-blue-600 hover:border-b border-blue-500 cursor-pointer">
            <a href={`mailto:${listItem.email}`}>
              {listItem[columnConfig[2].fieldName]}
            </a>
            <FiExternalLink
              fontSize={12}
              className="opacity-0 ml-1 group-hover:opacity-100 inline-block"
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
          itemType={"ulist-item-" + columnConfig[3].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {listItem[columnConfig[3].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        // donations
        style={{ width: `${columnConfig[4].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"ulist-item-" + columnConfig[4].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          ₹ {listItem[columnConfig[4].fieldName]}
        </ConditionalMarquee>
      </div>

      <div
        // created_at
        style={{ width: `${columnConfig[5].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"ulist-item-" + columnConfig[5].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {new Date(listItem[columnConfig[5].fieldName]).toLocaleString(
            "en-gb",
            { timeZone: "Asia/Kolkata" }
          )}
        </ConditionalMarquee>
      </div>

      <div
        // updated_at
        style={{ width: `${columnConfig[6].width}%` }}
        className="flex flex-col justify-center px-4 font-medium text-base"
      >
        <ConditionalMarquee
          itemType={"ulist-item-" + columnConfig[6].fieldName}
          id={listItem._id}
          key={uid(10)}
        >
          {new Date(listItem[columnConfig[6].fieldName]).toLocaleString(
            "en-gb",
            { timeZone: "Asia/Kolkata" }
          )}
        </ConditionalMarquee>
      </div>
    </div>
  );
}
