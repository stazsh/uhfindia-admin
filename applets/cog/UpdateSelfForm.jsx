import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { DialogContext } from "../../context/DialogContext";
import { useNavigate } from "react-router-dom";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import validator from "@rjsf/validator-ajv8";
import { Form } from "@rjsf/mui";
import { axiosInstance } from "../../api/axiosConfig";
import { userRoles } from "../../constants/other";
import _ from "lodash";
import { hierarchy } from "../../constants/hierarchy";

function UpdateSelfForm() {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState(null);
  const { userContextObj } = useContext(UserContext);
  const formRef = useRef();

  useEffect(() => {
    async function fetchFormData() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading user details...");
        const res = await axiosInstance().get("/cog", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        console.log(res.data);

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        });

        setFormData({
          name: res.data.payload.name,
          email: res.data.payload.email,
          phone: res.data.payload.phone,
          profurl: res.data.payload.profurl,
          role: res.data.payload.role,
          donations: res.data.payload.donations,
        });
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
          </>,
          () => navigate(-1)
        );
      }
    }

    fetchFormData();
  }, []);

  return (
    <div className="flex flex-col align-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <Form
          ref={formRef}
          autoComplete="false"
          schema={{
            title: `Account Information`,
            type: "object",
            description:
              "Change your user account details and confirm current password before saving.",
            required: [
              "name",
              "email",
              "phone",
              "profurl",
              "role",
              "current_password",
            ],
            properties: {
              name: {
                type: "string",
                title: "Name",
              },
              email: {
                type: "string",
                title: "Email",
              },
              password: {
                type: "string",
                title: "New password",
                description:
                  "Leave this field blank if you wish to keep your current password unchanged. If you intend to change your password, please enter the new password in this field. You will still have to fill in the current password to save the changes.",
              },
              phone: {
                type: "string",
                title: "Phone",
              },
              profurl: {
                type: "string",
                title: "Profile picture URL",
                description:
                  "Please input the CDN link of the profile picture you would like to set. Ensure the target image is in one of the browser-recognized image formats.",
              },
              role: {
                type: "string",
                title: "Role",
                enum: ["superadmin", "admin", "volunteer"],
                description:
                  "The self role-downgrader feature is provided for occasional convenience and is not recommended for dicretionary use. Kindly reach out to one of the administrators to facilitate an upgrade or downgrade of your user role.",
              },
              current_password: {
                type: "string",
                title: "Current password",
              },
            },
          }}
          uiSchema={{
            role: {
              "ui:enumDisabled": _.filter(
                userRoles,
                (value, key, collection) =>
                  hierarchy[value] > hierarchy[userContextObj.role]
              ),
            },
            phone: {
              "ui:props": {
                inputType: "tel",
              },
            },
            email: {
              "ui:widget": "email",
            },
            password: {
              "ui:widget": "password",
            },
            comment: {
              "ui:widget": "textarea",
              "ui:classNames": "dark-text",
              "ui:readonly": true,
            },
            "ui:submitButtonOptions": {
              submitText: "Save",
            },
            current_password: {
              "ui:widget": "password",
              "ui:description":
                "Enter your current password before saving to confirm.",
            },
          }}
          validator={validator}
          formData={formData}
          onSubmit={async () => {
            console.log(formRef.current.state.formData);

            setFormData(formRef.current.state.formData);

            try {
              UTIL_showLoadingDialog(setShowDialog, "Updating account...");

              await axiosInstance().put(
                "/cog",
                formRef.current.state.formData,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
                  },
                }
              );

              setTimeout(() => {
                UTIL_showAlertDialog(
                  setShowDialog,
                  <>
                    <BiCheckCircle
                      fontSize={30}
                      className="inline-block mr-4"
                    />
                    <span>
                      Account details updated succesfully. You have been logged
                      out. Re-login to continue.
                    </span>
                  </>,
                  () => navigate("/session/signin")
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

export default UpdateSelfForm;
