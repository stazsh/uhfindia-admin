import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DialogContext } from "../../context/DialogContext";
import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { BiCheckCircle, BiErrorCircle, BiTrash } from "react-icons/bi";
import { axiosInstance } from "../../api/axiosConfig";
import NativeButton from "../../components/NativeButton";

function FeedbackForm() {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const formRef = useRef();

  useEffect(() => {
    async function fetchFeedback() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading details...");
        const res = await axiosInstance.get("/feedback", {
          params: {
            filter: {
              _id: id,
            },
          },
        });

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        });

        setFormData({
          user_name: res.data.payload.user_name,
          user_email: res.data.payload.user_email,
          comment: res.data.payload.comment,
        });
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

    fetchFeedback();
  }, []);

  return (
    <div className="flex flex-col align-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <div className="flex justify-end w-full max-w-[1100px] self-center">
          <NativeButton
            IconType={BiTrash}
            text={"Delete feedback"}
            type={"red"}
            onClick={async () => {
              UTIL_showLoadingDialog(setShowDialog, "Removing item...");

              await axiosInstance.delete("/feedback", {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
                },
                params: {
                  filter: { _id: id },
                },
              });

              setTimeout(() => {
                UTIL_showAlertDialog(
                  setShowDialog,
                  <>
                    <BiCheckCircle
                      fontSize={30}
                      className="inline-block mr-4"
                    />
                    <span>Item removed succesfully</span>
                  </>,
                  () => navigate(-1)
                );
              });
            }}
          />
        </div>
        <Form
          ref={formRef}
          autoComplete="false"
          schema={{
            title: `Feedback ${id}`,
            type: "object",
            properties: {
              user_name: {
                type: "string",
                title: "Name",
              },
              user_email: {
                type: "string",
                title: "Email",
              },
              comment: {
                type: "string",
                title: "Comment",
              },
            },
          }}
          uiSchema={{
            "ui:submitButtonOptions": {
              norender: true,
            },
            user_name: {
              "ui:classNames": "dark-text",
              "ui:readonly": true,
            },
            user_email: {
              "ui:classNames": "dark-text",
              "ui:readonly": true,
            },
            comment: {
              "ui:widget": "textarea",
              "ui:classNames": "dark-text",
              "ui:readonly": true,
            },
          }}
          validator={validator}
          formData={formData}
        />
      </div>
    </div>
  );
}

export default FeedbackForm;
