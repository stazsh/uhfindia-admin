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
import {
  BiCheckCircle,
  BiErrorCircle,
  BiMailSend,
  BiTrash,
} from "react-icons/bi";
import NativeButton from "../../components/NativeButton";
import { jsonToUrlEncodedString } from "../../utils/others";

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
        <div className="flex justify-end w-full space-x-5 max-w-[1100px] self-center pb-10">
          <NativeButton
            IconType={BiMailSend}
            text={"Send Rejection Mail"}
            type={"blue"}
            onClick={function (e) {
              const encodedEmail = jsonToUrlEncodedString({
                subject: "UHF India Volunteer Application Status: Rejected",
                body: `Dear ${formData.name},\n\nWe regret to inform you that your volunteering application for the United HOPE Foundation India NGO has been reviewed, and unfortunately, it has not been approved at this time. We appreciate your interest in contributing to our cause. While your application was not successful on this occasion, we encourage you to continue supporting us in other ways or explore further opportunities with our organization in the future. Thank you for your understanding and continued support.\n\nThank you,\nUHF India Team`,
              });
              const mailtoLink = `mailto:${formData.email}?${encodedEmail}`;
              const a = document.createElement("a");
              a.setAttribute("href", mailtoLink);
              a.setAttribute("target", "_blank");
              a.style.display = "none"; // Hide the anchor element

              document.body.appendChild(a);

              a.click(); // Programmatically click on the anchor element

              document.body.removeChild(a); // Remove the anchor element from the document
            }}
          />

          <NativeButton
            IconType={BiMailSend}
            text={"Send Approval Mail"}
            type={"blue"}
            onClick={function (e) {
              const encodedEmail = jsonToUrlEncodedString({
                subject: "UHF India Volunteer Application Approval",
                body: `Dear ${formData.name},\n\nWe are pleased to inform you that your volunteering application for the United HOPE Foundation India NGO has been approved! Your dedication and commitment to making a difference are truly appreciated. We look forward to your valuable contributions to our cause. Thank you for choosing to be a part of our efforts to bring positive change to our community.\n\nThank you,\nUHF India Team`,
              });
              const mailtoLink = `mailto:${formData.email}?${encodedEmail}`;
              const a = document.createElement("a");
              a.setAttribute("href", mailtoLink);
              a.setAttribute("target", "_blank");
              a.style.display = "none"; // Hide the anchor element

              document.body.appendChild(a);

              a.click(); // Programmatically click on the anchor element

              document.body.removeChild(a); // Remove the anchor element from the document
            }}
          />

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
