import React from "react";
import SectionHeader from "../../components/SectionHeader";
import FeedbackForm from "./FeedbackForm";
import { Route, Routes } from "react-router-dom";
import FeedbackContainerMui from "./FeedbackContainerMui";

function Feedback() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <SectionHeader
              title={"Feedback"}
              subtitle={"View your user community's feedback here."}
            />

            <FeedbackContainerMui />
          </div>
        }
      />

      <Route path="/:id" element={<FeedbackForm />} />
    </Routes>
  );
}

export default Feedback;
