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
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { statusShieldSelector } from "../../components/StatusShields";
import { useQuery } from "@tanstack/react-query";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiXCircle } from "react-icons/bi";

function VAppListContainerMui() {
  const navigate = useNavigate();
  const { setShowDialog } = React.useContext(DialogContext);

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["vapplications"],
    queryFn: async () => {
      UTIL_showLoadingDialog(
        setShowDialog,
        "Fetching volunteer applications..."
      );
      const res = await axiosInstance().get("/vapplications");
      console.log(res);
      UTIL_hideDialog(setShowDialog);
      return res;
    },
  });

  return (
    <div className="relative flex-grow shrink-0">
      <TableContainer className="absolute w-full h-full" component={Paper}>
        <Table stickyHeader sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Application ID</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Phone</b>
              </TableCell>
              <TableCell>
                <b>Date of Posting (IST)</b>
              </TableCell>
              <TableCell>
                <b>Application Status</b>
              </TableCell>
              <TableCell>
                <b>Mail Dispatched?</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.data.payload.map((row) => (
                <TableRow
                  className="group cursor-pointer hover:bg-slate-100"
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() =>
                    navigate(`/dashboard/volunteer-applications/${row._id}`)
                  }
                >
                  <TableCell component="th" scope="row">
                    <div className="flex whitespace-nowrap flex-row place-items-center">
                      <code>{row._id}</code>
                    </div>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <a
                      className="text-blue-600 hover:text-blue-400 transition-all border-transparent border-b hover:border-blue-400"
                      href={`mailto:${row.user_email}`}
                    >
                      {row.email}
                    </a>
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(row.created_at).toLocaleString("en-in", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </TableCell>
                  <TableCell>
                    {statusShieldSelector[row.application_status.toLowerCase()]}
                  </TableCell>
                  <TableCell>
                    {row.is_email_sent ? (
                      <FaRegCheckCircle fontSize={20} color="00ff00" />
                    ) : (
                      <BiXCircle fontSize={20} color="red" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VAppListContainerMui;
