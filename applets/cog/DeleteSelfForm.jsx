import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  UTIL_showAlertDialog,
  UTIL_showConfirmDialog,
} from "../../utils/muiDialogUtils";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { DialogContext } from "../../context/DialogContext";
import { axiosInstance } from "../../api/axiosConfig";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";

function DeleteSelfForm() {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const formRef = useRef();

  const deleteSelf = async () => {
    try {
      UTIL_showConfirmDialog(
        setShowDialog,
        "Are you sure you want to delete this account with all its data?",
        async () => {
          try {
            await axiosInstance.post("/cog", formRef.current.state.formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
              },
            });

            UTIL_showAlertDialog(
              setShowDialog,
              <>
                <div className="flex flex-row flex-start">
                  <BiCheckCircle fontSize={30} className="inline-block mr-4" />
                  Account deleted successfully
                </div>
              </>,
              () => navigate("/session/signin")
            );
          } catch (e) {
            UTIL_showAlertDialog(
              setShowDialog,
              <>
                <div className="flex flex-row flex-start">
                  <BiErrorCircle fontSize={30} className="inline-block mr-4" />
                  An unexpected error occured
                </div>
                <div>
                  <div className="m-2" />
                  <code>{e.response.data.message || e.message}</code>
                </div>
              </>,
              () => navigate(-1)
            );
          }
        }
      );
    } catch (e) {
      console.log(e);
      UTIL_showAlertDialog(
        setShowDialog,
        <>
          <div className="flex flex-row flex-start">
            <BiErrorCircle fontSize={30} className="inline-block mr-4" />
            An unexpected error occured
          </div>
          <div>
            <div className="m-2" />
            <code>{e.response.data.message || e.message}</code>
          </div>
        </>
      );
    }
  };

  return (
    <div className="flex flex-col align-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <Form
          schema={{
            title: `Account Deletion`,
            type: "object",
            description:
              "Delete your user account. Caution: This will remove all data related to this account.",
            required: ["current_password"],
            properties: {
              current_password: {
                type: "string",
                title: "Current password",
              },
            },
          }}
          uiSchema={{
            current_password: {
              "ui:widget": "password",
            },
            "ui:submitButtonOptions": {
              submitText: "Delete Account",
              props: {
                className: "red-bg",
              },
            },
          }}
          validator={validator}
          onSubmit={deleteSelf}
        />
      </div>
    </div>
  );
}

export default DeleteSelfForm;
