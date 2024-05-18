import { Form } from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import React, { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosConfig";
import { downloadPDF } from "../../constants/other";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showConfirmDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { DialogContext } from "../../context/DialogContext";
import { BiErrorCircle } from "react-icons/bi";
import axios from "axios";

function Receipt() {
  const formRef = useRef();
  const { setShowDialog } = useContext(DialogContext);
  const [fundraiserList, setFundraiserList] = useState([]);

  useEffect(() => {
    async function getFundraiserList() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading fundraiser list...");

        const res = await axiosInstance().get("/fundraisers", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        console.log(res);

        setTimeout(() => {
          UTIL_hideDialog(setShowDialog);
        });

        setFundraiserList(res.data.payload);
      } catch (e) {
        console.error(e);
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
    }

    getFundraiserList();
  }, []);

  const generateReceipt = async () => {
    try {
      const formData = formRef.current.state.formData;
      const res = await axios.post("http://localhost:5000/v1/dash/receipt", {
        ...formData,
        fundraiser_id: formData.fundraiser_id.split("|")[1].trim(),
      });
      downloadPDF(res.data.link80g);
      UTIL_showConfirmDialog(setShowDialog, <>View receipt in new tab?</>, () =>
        window.open(res.data.link80g_view, "_blank")
      );
    } catch (e) {
      console.log(e);
      alert("An error occured");
    }
  };

  return (
    <div className="p-20">
      {!!fundraiserList && !!fundraiserList.length && (
        <Form
          key={fundraiserList}
          ref={formRef}
          autoComplete="false"
          schema={{
            title: "Donation Receipt Form",
            type: "object",
            properties: {
              billing_email: {
                type: "string",
                title: "Billing Email",
                format: "email",
              },
              billing_name: {
                type: "string",
                title: "Billing Name",
              },
              billing_tel: {
                type: "string",
                title: "Billing Telephone",
                pattern: "^[0-9]{10}$",
              },
              fundraiser_id: {
                type: "string",
                title: "Fundraiser ID",
                enum: fundraiserList.map((i) => `${i.title} | ${i._id}`),
              },
              pan_no: {
                type: "string",
                title: "PAN Number",
              },
              donation_amount: {
                type: "number",
                title: "Donation Amount",
                minimum: 0,
              },
            },
            required: [
              "billing_email",
              "billing_name",
              "billing_tel",
              "fundraiser_id",
              "pan_no",
              "donation_amount",
            ],
          }}
          uiSchema={{
            billing_email: {
              "ui:widget": "email",
            },
            donation_amount: {
              "ui:widget": "updown",
            },
            "ui:submitButtonOptions": {
              submitText: "Generate",
            },
          }}
          validator={validator}
          onSubmit={generateReceipt}
        />
      )}
    </div>
  );
}

export default Receipt;
