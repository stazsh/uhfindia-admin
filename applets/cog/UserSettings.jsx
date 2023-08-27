import React from "react";
import UpdateSelfForm from "./UpdateSelfForm";
import DeleteSelfForm from "./DeleteSelfForm";

function UserSettings() {
  return (
    <div className="w-full h-fit flex flex-col space-y-8 p-8 mob:p-5">
      <UpdateSelfForm />
      <DeleteSelfForm />
    </div>
  );
}

export default UserSettings;
