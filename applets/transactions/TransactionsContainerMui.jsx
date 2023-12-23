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
import { useQuery } from "@tanstack/react-query";

function TransactionsContainerMui() {
  const navigate = useNavigate();
  const { setShowDialog } = React.useContext(DialogContext);
  const [feedbackList, setFeedbackList] = React.useState([]);

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axiosInstance.get("/transactions"),
    initialData: null,
  });

  React.useEffect(() => {
    refetch();
  }, [location.pathname]);

  return (
    <div className="relative flex-grow shrink-0">
      <TableContainer className="absolute w-full h-full" component={Paper}>
        <Table stickyHeader sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Tracking ID</b>
              </TableCell>
              <TableCell>
                <b>Order ID</b>
              </TableCell>
              <TableCell>
                <b>Billing Name</b>
              </TableCell>
              <TableCell>
                <b>Email ID</b>
              </TableCell>
              <TableCell>
                <b>Phone</b>
              </TableCell>
              <TableCell>
                <b>Fundraiser ID</b>
              </TableCell>
              <TableCell>
                <b>Amount (in INR)</b>
              </TableCell>
              <TableCell>
                <b>Tx. Date</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
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
                  onClick={() => navigate(`/dashboard/transactions/${row._id}`)}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex whitespace-nowrap flex-row place-items-center">
                      <code>{row.txobj.tracking_id}</code>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div className="flex whitespace-nowrap flex-row place-items-center">
                      <code>{row.txobj.order_id}</code>
                    </div>
                  </TableCell>
                  <TableCell>{row.txobj.billing_name || "-"}</TableCell>
                  <TableCell>
                    <a
                      className="text-blue-600 hover:text-blue-400 transition-all border-transparent border-b hover:border-blue-400"
                      href={`mailto:${row.txobj.billing_email}`}
                    >
                      {row.txobj.billing_email || "-"}
                    </a>
                  </TableCell>
                  <TableCell>{row.txobj.billing_tel || "-"}</TableCell>
                  <TableCell>
                    <code>{row.txobj.merchant_param1 || "-"}</code>
                  </TableCell>
                  <TableCell>₹ {row.txobj.mer_amount || "-"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.txobj.trans_date || "-"}
                  </TableCell>
                  <TableCell>
                    {statusShieldSelector[row.txobj.order_status.toLowerCase()]}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TransactionsContainerMui;
