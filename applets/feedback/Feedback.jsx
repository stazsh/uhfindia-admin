import React from "react";
import SectionHeader from "../../components/SectionHeader";
import FeedbackContainer from "./FeedbackContainer";

function Feedback() {
  return (
    <div className="w-full h-full flex flex-col space-y-8 p-8">
      <SectionHeader
        title={"Feedback"}
        subtitle={"View your user community's feedback here."}
      />

      <FeedbackContainer />
    </div>
  );
}

export default Feedback;
