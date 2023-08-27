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
import { useNavigate, useParams } from "react-router-dom";
import { BiCheckCircle, BiErrorCircle } from "react-icons/bi";
import NativeButton from "../../components/NativeButton";
import { FiTrash } from "react-icons/fi";
import { UserContext } from "../../context/UserContext";

export function UFormUpdate({ updateRole }) {
  const { userContextObj } = useContext(UserContext);
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState([]);
  const formRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading user data...");
        const res = await axiosInstance.get("/users", {
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

        console.log(res.data);

        setFormData({
          name: res.data.payload[0].name,
          email: res.data.payload[0].email,
          password: "",
          phone: res.data.payload[0].phone,
          role: res.data.payload[0].role,
          profurl: res.data.payload[0].profurl,
          donations: res.data.payload[0].donations,
          allow_access: res.data.payload[0].allow_access,
        });
      } catch (e) {
        console.error(e);
        UTIL_showAlertDialog(
          setShowDialog,
          <>
            <BiErrorCircle fontSize={30} className="inline-block mr-4" />
            <span>An unexpected error occured</span>
          </>
        );
      }
    }

    fetchUser();
  }, []);

  async function updateUser() {
    setFormData(formRef.current.state.formData);
    try {
      UTIL_showLoadingDialog(setShowDialog, "Updating user...");

      await axiosInstance.put("/users", formRef.current.state.formData, {
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
            <span>User updated succesfully</span>
          </>
        );
      }, 343);
    } catch (e) {
      console.error(e);
      UTIL_showAlertDialog(
        setShowDialog,
        <>
          <BiErrorCircle fontSize={30} className="inline-block mr-4" />
          <span>An unexpected error occured</span>
        </>
      );
    }
  }

  async function deleteUser() {
    try {
      UTIL_showLoadingDialog(setShowDialog, "Deleting user...");

      await axiosInstance.delete("/users", {
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
            <span>User deleted succesfully</span>
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
          <span>An unexpected error occured</span>
        </>
      );
    }
  }

  return (
    <div className="flex flex-row justify-center">
      <div className="p-8 self-center w-full max-w-[1000px] h-full">
        <div className="flex w-full justify-end">
          <NativeButton
            IconType={FiTrash}
            text={"Delete " + updateRole}
            type={"red"}
            onClick={deleteUser}
          />
        </div>
        <Form
          formData={formData}
          autoComplete={"false"}
          ref={formRef}
          schema={{
            title: `Update ${updateRole}: ${id}`,
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
              password: {
                type: "string",
                title: "New password",
              },
              phone: {
                type: "string",
                title: "Phone",
              },
              profurl: {
                type: "string",
                title: "Profile picture URL",
              },
              role: {
                type: "string",
                title: "User role",
                enum: ["superadmin", "admin", "volunteer", "community"],
              },
              donations: {
                type: "number",
                title: "Net worth of donations (in INR)",
              },
              allow_access: {
                type: "boolean",
                title: "Allow service access?",
              },
            },
          }}
          uiSchema={{
            role: {
              "ui:readonly": true,
            },
            password: {
              "ui:widget": "password",
              "ui:options": {
                inputType: "password",
              },
            },
            email: {
              "ui:widget": "email",
            },
            phone: {
              "ui:options": {
                inputType: "tel",
              },
            },
            role: {
              "ui:readonly":
                userContextObj.role !== "superadmin" ? true : false,
            },
            donations: {
              "ui:readonly": true,
            },
            allow_access: {
              "ui:widget": "radio",
              "ui:readonly":
                userContextObj.role !== "superadmin" ? true : false,
            },
          }}
          validator={validator}
          onSubmit={updateUser}
        />
      </div>
    </div>
  );
}
