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
import { statusShieldSelector } from "../../components/StatusShields";

function UContainerMui({ onlyRenderRole }) {
  const [uList, setUList] = React.useState([]);
  const { setShowDialog } = React.useContext(DialogContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getUsers() {
      try {
        const res = await axiosInstance.get("/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("uhf_jwt"),
          },
          params: {
            filter: {
              role: onlyRenderRole,
            },
          },
        });
        console.log(res.data);
        setUList(res.data.payload);
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

    getUsers();
  }, []);

  return (
    <div className="relative flex-grow shrink-0">
      <TableContainer className="absolute w-full h-full" component={Paper}>
        <Table stickyHeader sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>UUID</b>
              </TableCell>
              <TableCell>
                <b>Email</b>
              </TableCell>
              <TableCell>
                <b>Phone</b>
              </TableCell>
              <TableCell>
                <b>Donations</b>
              </TableCell>
              <TableCell>
                <b>Created&nbsp;At&nbsp;(IST)</b>
              </TableCell>
              <TableCell>
                <b>Updated&nbsp;At&nbsp;(IST)</b>
              </TableCell>
              <TableCell>
                <b>Service&nbsp;Access</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {uList.map((row) => (
              <TableRow
                className="group cursor-pointer hover:bg-slate-100"
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() =>
                  navigate(`/dashboard/users/${onlyRenderRole}/${row._id}`)
                }
              >
                <TableCell component="th" scope="row">
                  <div className="flex whitespace-nowrap flex-row place-items-center">
                    <img
                      src={row.profurl}
                      alt="User PFP"
                      className="h-10 mr-5 aspect-square border-2 transition-all group-hover:border-4 border-blue-300 group-hover:border-blue-600 rounded-full object-cover"
                    />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell>
                  <code>{row._id}</code>
                </TableCell>
                <TableCell>
                  <a
                    className="text-blue-600 hover:text-blue-400 transition-all border-transparent border-b hover:border-blue-400"
                    href={`mailto:${row.user_email}`}
                  >
                    {row.email}
                  </a>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>₹ {row.donations}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.created_at).toLocaleString("en-in", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.updated_at).toLocaleString("en-in", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>
                <TableCell>
                  {statusShieldSelector[`_${row.allow_access}`]}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UContainerMui;
