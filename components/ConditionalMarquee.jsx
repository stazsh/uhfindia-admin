import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { nbspString } from "../db/Clients.config";

function ConditionalMarquee({ itemType, id, className, children }) {
  const [isTitleOverflowing, setIsTitleOveflowing] = useState(false);

  useEffect(() => {
    const titleContainerWidth = document
      .getElementById(`${itemType}-${id}-parent`)
      .getBoundingClientRect().width;

    const titleChildWidth = document
      .getElementById(`${itemType}-${id}-child`)
      .getBoundingClientRect().width;

    if (titleChildWidth > titleContainerWidth) {
      setIsTitleOveflowing(true);
    }
  }, []);

  return (
    <div
      id={`${itemType}-${id}-parent`}
      className={`overflow-x-auto w-full ${className}`}
    >
      {!isTitleOverflowing && (
        <div id={`${itemType}-${id}-child`} className="w-fit whitespace-nowrap">
          {children}
        </div>
      )}
      {isTitleOverflowing && (
        <Marquee>
          <span>{children}</span>
          {nbspString}
        </Marquee>
      )}
    </div>
  );
}

export default ConditionalMarquee;
