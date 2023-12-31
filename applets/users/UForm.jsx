import Form from "@rjsf/mui";
import React, { useContext, useRef } from "react";
import validator from "@rjsf/validator-ajv8";
import { axiosInstance } from "../../api/axiosConfig";
import _ from "lodash";
import { DialogContext } from "../../context/DialogContext";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { IoCloudDoneSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

function UForm({ createRole }) {
  const userRoles = ["superadmin", "admin", "volunteer"];
  const formRef = useRef();
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);

  const RJSFSchema = {
    title: "Create " + createRole + "'s account",
    type: "object",
    properties: {
      name: {
        type: "string",
        title: "Full name",
      },
      email: {
        type: "string",
        title: "Primary Email",
      },
      phone: {
        type: "string",
        title: "Phone",
      },
      role: {
        type: "string",
        title: "User role",
        enum: ["superadmin", "admin", "volunteer"],
      },
      profurl: {
        type: "string",
        title: "Profile picture URL",
        description: "You may leave this field empty.",
      },
    },
    required: ["name", "email", "phone", "role"],
  };

  const uiSchema = {
    role: {
      "ui:enumDisabled": _.filter(
        userRoles,
        (value, key, collection) => value !== createRole
      ),
    },
    email: {
      "ui:widget": "email",
    },
    phone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <Form
          autoComplete={"false"}
          ref={formRef}
          schema={RJSFSchema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={async () => {
            try {
              UTIL_showLoadingDialog(setShowDialog, "Creating account...");
              await axiosInstance().post(
                "/users",
                formRef.current.state.formData,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
                  },
                }
              );
              setTimeout(() => {
                UTIL_hideDialog(setShowDialog);
                UTIL_showAlertDialog(
                  setShowDialog,
                  <>
                    <IoCloudDoneSharp
                      fontSize={30}
                      className="inline-block mr-4"
                    />
                    <span>Account created successfully</span>
                  </>,
                  () => navigate(-1)
                );
              });
            } catch (e) {
              console.error(e);
              UTIL_showAlertDialog(
                setShowDialog,
                <>
                  <BiErrorCircle fontSize={30} className="inline-block mr-4" />
                  <span>
                    <div>An unexpected error occured</div>
                    <br />
                    <code>{e.response.data.message || e.message}</code>
                  </span>
                </>
              );
            }
          }}
        />
      </div>
    </div>
  );
}

export default UForm;
