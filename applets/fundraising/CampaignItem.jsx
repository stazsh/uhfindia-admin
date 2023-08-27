import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { uid } from "uid";
import "../../styles/campaign-item.css";
import { FaDonate } from "react-icons/fa";
import { RiFundsFill } from "react-icons/ri";
import commaNumber from "comma-number";

function CampaignItem({
  images,
  title,
  _id,
  created_at,
  target_amount,
  current_amount,
  description,
  onClick,
}) {
  const [themeColour, setThemeColour] = useState(
    (() => {
      const colorArray = [
        ["#072364dd", "rgb(0, 68, 153)"], // Blue
        ["#20633fdd", "rgb(33, 155, 90)"], // Green
        ["#66120cdd", "rgb(187, 33, 33)"], // Red
        ["#a54500cc", "rgb(234, 117, 34)"], // Amber
      ];
      return colorArray[Math.floor(colorArray.length * Math.random())];
    })()
  );

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-neutral-50 group duration-300 transition-all shadow-xl cursor-pointer hover:ring-8 ring-blue-200 hover:-translate-y-1`}
      onClick={onClick}
    >
      <div className="w-full relative">
        <div className="h-64" />
        <div
          className="flex flex-col justify-between text-white transition-all duration-300 p-5 absolute top-0 left-o w-full h-full"
          style={{
            backgroundColor: themeColour[0],
          }}
        >
          <div className="text-sm">
            Created{" "}
            <span className="font-bold">
              {new Date(created_at).toLocaleDateString("en-in")}
            </span>
          </div>
          <div>
            <div className="text-xs font-mono">
              CAMPAIGN #{String(_id).toUpperCase()}
            </div>
            <div className="text-3xl font-light">{title}</div>
            <div className="text-xs">{description}</div>
          </div>
        </div>
      </div>

      <div
        className={"p-5 mob:p-3 h-fit"}
        style={{ backgroundColor: themeColour[1].split("-")[0] }}
      >
        <div className="grid gap-5 mob:gap-3 grid-cols-2">
          <div className="rounded-xl h-20 bg-[#00000022] text-white p-2 flex flex-row justify-evenly items-center hover:shadow-lg transition-all duration-300">
            <FaDonate fontSize={30} className="mr-2 inline-block" />
            <div className="flex flex-col justify-center">
              <div className="text-xs font-semibold">Target</div>
              <div className="text-2xl mob:text-sm font-bold">
                ₹ {commaNumber(target_amount)}
              </div>
            </div>
          </div>
          <div className="rounded-xl h-20 bg-[#00000022] text-white p-2 flex flex-row justify-evenly items-center hover:shadow-lg transition-all duration-300">
            <RiFundsFill fontSize={34} className="mr-2 inline-block" />
            <div className="flex flex-col justify-center">
              <div className="text-xs font-semibold">Raised so far</div>
              <div className="text-2xl mob:text-sm font-bold">
                ₹ {commaNumber(current_amount)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignItem;
