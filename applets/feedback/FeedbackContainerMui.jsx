import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { DialogContext } from "../../context/DialogContext";
import { axiosInstance } from "../../api/axiosConfig";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { BiErrorCircle } from "react-icons/bi";

function FeedbackContainerMui({ className }) {
  const navigate = useNavigate();
  const { setShowDialog } = React.useContext(DialogContext);
  const [feedbackList, setFeedbackList] = React.useState([]);

  React.useEffect(() => {
    async function getFeedbackList() {
      try {
        UTIL_showLoadingDialog(setShowDialog, "Loading feedback list...");
        const res = await axiosInstance.get("/feedback", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
        });

        UTIL_hideDialog(setShowDialog);
        setFeedbackList(res.data.payload);
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

    getFeedbackList();
  }, []);

  return (
    <div className="relative flex-grow shrink-0">
      <TableContainer className="absolute w-full h-full" component={Paper}>
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>UUID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Posted&nbsp;At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackList.map((row) => (
              <TableRow
                className="group cursor-pointer hover:bg-slate-100"
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/dashboard/feedback/${row._id}`)}
              >
                <TableCell component="th" scope="row">
                  <div className="flex whitespace-nowrap flex-row place-items-center">
                    <img
                      src={row.user_pfp}
                      alt="User PFP"
                      className="h-10 mr-5 aspect-square border-2 transition-all group-hover:border-4 border-blue-300 group-hover:border-blue-600 rounded-full object-cover"
                    />
                    {row.user_name}
                  </div>
                </TableCell>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>
                  <a
                    className="text-blue-600 hover:text-blue-400 transition-all border-transparent border-b hover:border-blue-400"
                    href={`mailto:${row.user_email}`}
                  >
                    {row.user_email}
                  </a>
                </TableCell>
                <TableCell>{row.comment}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.created_at).toLocaleString("en-in", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FeedbackContainerMui;
