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
import { hierarchy } from "../../constants/hierarchy";
import { userRoles } from "../../constants/other";

export function UFormUpdate({ updateRole }) {
  const { userContextObj } = useContext(UserContext);
  const { setShowDialog } = useContext(DialogContext);
  const [formData, setFormData] = useState([]);
  const [isHAuthorised, setIsHAuthorised] = useState([]);
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

        setIsHAuthorised(
          hierarchy[userContextObj.role] > hierarchy[res.data.payload[0].role]
            ? true
            : false
        );
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
          <span>
            <div>An unexpected error occured</div>
            <br />
            <code>{e.response.data.message || e.message}</code>
          </span>
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
    <div className="flex flex-row justify-center">
      <div className="p-8 self-center w-full max-w-[1100px] h-full">
        <div className="flex w-full justify-end">
          {isHAuthorised && (
            <NativeButton
              IconType={FiTrash}
              text={"Delete " + updateRole}
              type={"red"}
              onClick={deleteUser}
            />
          )}
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
                enum: ["superadmin", "admin", "volunteer"],
              },
              allow_access: {
                type: "boolean",
                title: "Allow service access?",
              },
            },
          }}
          uiSchema={{
            "ui:submitButtonOptions": {
              norender: !isHAuthorised,
            },
            name: {
              "ui:readonly": !isHAuthorised,
            },
            profurl: {
              "ui:readonly": !isHAuthorised,
            },
            password: {
              "ui:widget": "password",
              "ui:options": {
                inputType: "password",
              },
              "ui:readonly": !isHAuthorised,
            },
            email: {
              "ui:widget": "email",
              "ui:readonly": !isHAuthorised,
            },
            phone: {
              "ui:options": {
                inputType: "tel",
              },
              "ui:readonly": !isHAuthorised,
            },
            role: {
              "ui:readonly": !isHAuthorised,
              "ui:enumDisabled": _.filter(
                userRoles,
                (value, key, collection) =>
                  hierarchy[value] >= hierarchy[userContextObj.role]
              ),
            },
            allow_access: {
              "ui:widget": "radio",
              "ui:readonly": !isHAuthorised,
            },
          }}
          validator={validator}
          onSubmit={updateUser}
        />
      </div>
    </div>
  );
}
