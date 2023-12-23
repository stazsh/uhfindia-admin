import Form from "@rjsf/mui";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { BiCheckCircle, BiErrorCircle, BiTrash } from "react-icons/bi";
import NativeButton from "../../components/NativeButton";

function ApplicationPreview() {
  const formRef = useRef();
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchFormData() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading application data...");
        const res = await axiosInstance.get("/vapplications", {
          params: {
            filter: { _id: id },
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        });

        setFormData({
          name: res.data.payload.name,
          email: res.data.payload.email,
          phone: res.data.payload.phone,
          created_at: res.data.payload.created_at,
          application_status: res.data.payload.application_status,
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

    fetchFormData();
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <div className="flex justify-end w-full max-w-[1100px] self-center">
          <NativeButton
            IconType={BiTrash}
            text={"Delete application"}
            type={"red"}
            onClick={async () => {
              UTIL_showLoadingDialog(setShowDialog, "Deleting application...");

              await axiosInstance.delete("/vapplications", {
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
                    <span>Application deleted succesfully</span>
                  </>,
                  () => navigate(-1)
                );
              });
            }}
          />
        </div>
        <Form
          formData={formData}
          autoComplete={"false"}
          ref={formRef}
          schema={{
            title: `View volunteering application ${id}`,
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
              created_at: {
                type: "string",
                title: "Posted At",
                format: "date-time",
              },
              application_status: {
                type: "string",
                title: "Application status",
                enum: ["Approved", "Rejected", "Pending"],
              },
              is_email_sent: {
                type: "boolean",
                title: "Confirmation email sent",
                description:
                  "Accountability checkbox: if confirmation email has been sent, mark as checked",
              },
            },
            required: ["application_status"],
          }}
          uiSchema={{
            "ui:submitButtonOptions": {
              submitText: "Update",
            },
            name: {
              "ui:readonly": true,
            },
            email: {
              "ui:widget": "email",
              "ui:readonly": true,
            },
            phone: {
              "ui:options": {
                inputType: "tel",
              },
              "ui:readonly": true,
            },
            created_at: {
              "ui:readonly": true,
            },
          }}
          validator={validator}
          onSubmit={async () => {
            setFormData(formRef.current.state.formData);

            try {
              UTIL_showLoadingDialog(
                setShowDialog,
                "Saving application status..."
              );

              await axiosInstance.put(
                "/vapplications",
                formRef.current.state.formData,
                {
                  params: {
                    filter: { _id: id },
                  },
                }
              );

              setTimeout(() => {
                UTIL_showAlertDialog(
                  setShowDialog,
                  <>
                    <IoCloudDoneSharp
                      fontSize={30}
                      className="inline-block mr-4"
                    />
                    <span>Application updated successfully</span>
                  </>
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

export default ApplicationPreview;
