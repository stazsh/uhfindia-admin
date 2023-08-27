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
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import { axiosInstance } from "../../api/axiosConfig";
import NativeButton from "../../components/NativeButton";
import { FiTrash } from "react-icons/fi";

function FundraisingForm({ createMode }) {
  const navigate = useNavigate();
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const formRef = useRef();

  useEffect(() => {
    async function fetchFundraiser() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading data...");
        const res = await axiosInstance.get("/fundraisers", {
          params: {
            filter: { _id: id },
          },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        }, 343);

        setFormData({
          title: res.data.payload.title,
          description: res.data.payload.description,
          start_date: res.data.payload.start_date,
          end_date: res.data.payload.end_date,
          target_amount: res.data.payload.target_amount,
          current_amount: res.data.payload.current_amount,
          category: res.data.payload.category,
          social_facebook: res.data.payload.social_facebook,
          social_twitter: res.data.payload.social_twitter,
          created_at: res.data.payload.created_at,
          updated_at: res.data.payload.updated_at,
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

    if (!createMode) fetchFundraiser();
  }, []);

  async function updateFundraiser() {
    setFormData(formRef.current.state.formData);
    try {
      UTIL_showLoadingDialog(setShowDialog, "Updating fundraiser...");

      await axiosInstance.put("/fundraisers", formRef.current.state.formData, {
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
            <BiCheckCircle fontSize={30} className="inline-block mr-4" />
            <span>Item updated succesfully</span>
          </>
        );
      }, 343);
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
  }

  async function createFundraiser() {
    try {
      UTIL_showLoadingDialog(setShowDialog, "Creating new fundraiser...");

      await axiosInstance.post("/fundraisers", formRef.current.state.formData, {
        headers: { Authorization: "Bearer " + localStorage.getItem("uhf_jwt") },
      });

      setTimeout(() => {
        UTIL_showAlertDialog(
          setShowDialog,
          <>
            <BiCheckCircle fontSize={30} className="inline-block mr-4" />
            <span>Fundraiser created succesfully</span>
          </>,
          () => navigate(-1)
        );
      }, 343);
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
  }

  async function deleteFundraiser() {
    try {
      UTIL_showLoadingDialog(setShowDialog, "Deleting fundraiser...");

      await axiosInstance.delete("/fundraisers", {
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
            <BiCheckCircle fontSize={30} className="inline-block mr-4" />
            <span>Fundraiser deleted succesfully</span>
          </>,
          () => navigate(-1)
        );
      }, 343);
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
  }

  return (
    <div className="flex flex-col align-center">
      <div className="p-8 self-center w-full max-w-[1000px] h-full">
        {!createMode && (
          <div className="flex w-full justify-end">
            <NativeButton
              IconType={FiTrash}
              text={"Delete fundraiser"}
              type={"red"}
              onClick={deleteFundraiser}
            />
          </div>
        )}
        <Form
          ref={formRef}
          autoComplete="false"
          schema={{
            title: `${id ? "" : "New"} Fundraiser ${id ? id : ""}`,
            type: "object",
            /* required: [
              "title",
              "description",
              "start_date",
              "end_date",
              "target_amount",
              "current_amount",
              "category",
              // "images",
              "social_facebook",
              "social_twitter",
            ], */
            properties: {
              title: {
                type: "string",
                title: "Fundraiser title",
              },
              description: {
                type: "string",
                title: "Fundraiser description",
              },
              start_date: {
                type: "string",
                title: "Start date (MM/DD/YYYY HH:MM)",
                format: "date-time",
              },
              end_date: {
                type: "string",
                title: "End date (MM/DD/YYYY HH:MM)",
                format: "date-time",
              },
              target_amount: {
                type: "number",
                title: "Target amount to be raised (in INR)",
              },
              current_amount: {
                type: "number",
                title: "Raised so far (in INR)",
              },
              category: {
                type: "string",
                title: "Fundraiser category or domain",
              },
              /* images: {
                type: "array",
                title: "Fundraiser images",
                items: {
                  type: "string",
                  format: "data-url",
                },
              }, */
              social_facebook: {
                type: "string",
                title: "Facebook page link",
              },
              social_twitter: {
                type: "string",
                title: "Twitter handle link",
              },
              created_at: {
                type: "string",
                title: "created_at (MM/DD/YYYY HH:MM)",
                format: "date-time",
              },
              updated_at: {
                type: "string",
                title: "updated_at (MM/DD/YYYY HH:MM)",
                format: "date-time",
              },
            },
          }}
          uiSchema={{
            "ui:submitButtonOptions": {
              submitText: "Save",
            },
            description: {
              "ui:widget": "textarea",
            },
            start_date: {
              "ui:props": {
                format: "LLL",
                inputFormat: "dd/MM/yyyy",
              },
            },
            /* images: {
              "ui:options": {
                accept: "image",
                filePreview: true,
              },
            }, */
            created_at: {
              "ui:readonly": true,
            },
            updated_at: {
              "ui:readonly": true,
            },
          }}
          validator={validator}
          formData={formData}
          onSubmit={() =>
            createMode ? createFundraiser() : updateFundraiser()
          }
        />
      </div>
    </div>
  );
}

export default FundraisingForm;
