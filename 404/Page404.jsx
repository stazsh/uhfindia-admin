import React from "react";
import { LiaFlaskSolid } from "react-icons/lia";
import { GoUnlink } from "react-icons/go";

function Page404() {
  return (
    <>
      <div className="h-[91%] w-full flex justify-center items-center absolute top-0 text-primary z-10">
        <div className="text-[15rem] font-mono flex flex-col text-center">
          <div className="leading-none font-black text-primary">404</div>
          <div className="text-base">
            ERROR! The resource you're looking for got
            <br />
            lost in the Corporate World :&lt;
          </div>
          <div className="text-sm mt-8 font-sans">
            Licensed by <b>SmallTownTalks®</b>
          </div>
        </div>
      </div>
      <div className="h-[9%] left-1/2 -translate-x-1/2 w-[90%] border-t border-boundary absolute bottom-0 z-10 text-neutral-500 flex justify-center items-center">
        <div className="w-[80%] flex flex-row justify-between items-center h-full">
          <div className="text-2xl whitespace-nowrap">
            <LiaFlaskSolid fontSize={26} className="inline-block mr-2" />
            <span className="font-black">Lipsum</span>CRM
          </div>
          <div className="text-xs flex-grow px-16 text-center">
            "Ready to take your corporate game to the next level? Meet
            LipsumCRM, the smartest, funniest, and most efficient software out
            there. It's like having a personal assistant with an impeccable
            sense of humor. Manage your contacts, boost sales, and laugh all the
            way to success!" ~<span className="italic font-bold">ChatGPT</span>
          </div>
          <div className="text-sm whitespace-nowrap">
            Curated with ❤ by
            <br />
            <span className="font-bold">World's Best Team 🤭</span>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 z-[-1] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <GoUnlink fontSize={600} className="opacity-[0.04]" />
      </div>
    </>
  );
}

export default Page404;
