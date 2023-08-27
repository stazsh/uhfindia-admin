import { DialogContent } from "@mui/material";
import { BiLoaderAlt } from "react-icons/bi";

export function UTIL_showLoadingDialog(setShowDialog, message) {
  setShowDialog({
    message: (
      <DialogContent>
        <span>
          <BiLoaderAlt
            fontSize={30}
            className="inline-block mr-4 infinite-rotation"
          />
          <span>{message}</span>
        </span>
      </DialogContent>
    ),
    buttons: [],
  });
}

export function UTIL_showAlertDialog(setShowDialog, message, onCheck) {
  setShowDialog({
    message: (
      <DialogContent>
        <span>{message}</span>
      </DialogContent>
    ),
    buttons: [
      {
        label: "Ok",
        onClick: () => {
          setShowDialog(null);
          onCheck ? onCheck() : null;
        },
      },
    ],
  });
}

export function UTIL_showConfirmDialog(
  setShowDialog,
  message,
  onConfirm,
  onAbort
) {
  setShowDialog({
    message: (
      <DialogContent>
        <span>{message}</span>
      </DialogContent>
    ),
    buttons: [
      {
        label: "Abort",
        onClick: async () => {
          setShowDialog(null);
          onAbort ? await onAbort() : null;
        },
      },
      {
        label: "Confirm",
        onClick: async () => {
          setShowDialog(null);
          onConfirm ? await onConfirm() : null;
        },
      },
    ],
  });
}

export function UTIL_hideDialog(setShowDialog) {
  setShowDialog(null);
}
