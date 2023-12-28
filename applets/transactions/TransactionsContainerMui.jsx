import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DialogContext } from "../../context/DialogContext";
import { axiosInstance } from "../../api/axiosConfig";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { BiErrorCircle, BiSolidXCircle } from "react-icons/bi";
import { statusShieldSelector } from "../../components/StatusShields";
import { useQuery } from "@tanstack/react-query";

function TransactionsContainerMui() {
  const { setShowDialog } = React.useContext(DialogContext);
  const [selectedTx, setSelectedTx] = React.useState(null);

  const { status, data, error, isFetching, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      UTIL_showLoadingDialog(setShowDialog, "Fetching transactions...");
      const res = await axiosInstance().get("/transactions");
      UTIL_hideDialog(setShowDialog);
      return res;
    },
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
              {/* <TableCell>
                <b>Tracking ID</b>
              </TableCell> */}
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
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Tx. Date</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>80G</b>
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
                  onClick={() => setSelectedTx(row)}
                >
                  {/* <TableCell component="th" scope="row">
                    <div className="flex whitespace-nowrap flex-row place-items-center">
                      <code>{row.txobj.tracking_id}</code>
                    </div>
                  </TableCell> */}
                  <TableCell component="th" scope="row">
                    <div className="flex whitespace-nowrap flex-row place-items-center">
                      {row.testtx && (
                        <span className="text-blue-500 font-black">
                          [T]&nbsp;
                        </span>
                      )}
                      <span className="p-0.5 px-2 text-xs bg-neutral-200 rounded-full">
                        {row.txobj.order_id.length > 15 || row.testtx
                          ? row.txobj.order_id.substring(0, 12) + "..."
                          : row.txobj.order_id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.txobj.billing_name || "-"}
                  </TableCell>
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
                  <TableCell className="text-right">
                    {!row.testtx && (
                      <span className="text-green-500 font-bold whitespace-nowrap">
                        ₹{" "}
                        {Number(row.txobj.mer_amount).toLocaleString("en-IN", {
                          compactDisplay: "long",
                          minimumFractionDigits: 2,
                        }) || "-"}
                      </span>
                    )}
                    {row.testtx && (
                      <span className="text-blue-500 font-bold whitespace-nowrap">
                        ₹{" "}
                        {Number(row.txobj.mer_amount).toLocaleString("en-IN", {
                          compactDisplay: "long",
                          minimumFractionDigits: 2,
                        }) || "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.txobj.trans_date || "-"}
                  </TableCell>
                  <TableCell>
                    {statusShieldSelector[row.txobj.order_status.toLowerCase()]}
                  </TableCell>
                  <TableCell>
                    {row.link80g ? (
                      <a
                        onClick={(e) => e.stopPropagation()}
                        href={row.link80g}
                        className="border-b border-blue-600 text-blue-600 hover:border-b-2"
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-neutral-400">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedTx && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 z-50">
          <div className="fixed p-5 flex flex-col mob:w-[350px] w-[800px] rounded-xl shadow-lg max-w-full z-50 h-[600px] bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex justify-end cursor-pointer">
              <BiSolidXCircle
                color="red"
                fontSize={30}
                onClick={() => setSelectedTx(null)}
              />
            </div>
            <div className="font-bold text-lg pl-5">Transaction details</div>
            <div className="flex-grow mt-3 bg-neutral-800 text-white w-full px-5 overflow-y-auto border rounded-xl">
              <table>
                <tbody>
                  {Object.entries(selectedTx.txobj).map(([key, value]) => (
                    <>
                      {selectedTx.txobj[key] && (
                        <tr key={key} className="p-2">
                          <td className="p-3">{key.toUpperCase()}</td>
                          <td className="p-3">
                            {typeof value === "object"
                              ? JSON.stringify(value)
                              : String(value)}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionsContainerMui;
