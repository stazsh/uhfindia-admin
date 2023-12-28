import React, { useContext, useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import SubsectionHeader from "../../components/SubsectionHeader";
import CampaignItem from "./CampaignItem";
import { uid } from "uid";
import { DialogContext } from "../../context/DialogContext";
import {
  UTIL_hideDialog,
  UTIL_showAlertDialog,
  UTIL_showLoadingDialog,
} from "../../utils/muiDialogUtils";
import { BiErrorCircle } from "react-icons/bi";
import { axiosInstance } from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export function fuzzyTimeDiffPast(targetDate) {
  /**
   * Calculates a human-readable fuzzy time difference between a given past date and the current time.
   *
   * @param {Date} targetDate - The past date to compare with the current time.
   * @returns {string} - A string representing the fuzzy time difference, e.g., "3 years ago" or "5 minutes ago".
   */

  const now = new Date();
  const diff = now - targetDate; // Calculate difference, ensuring it's positive

  // Define time units for better readability
  const seconds = 1000;
  const minutes = 60 * seconds;
  const hours = 60 * minutes;
  const days = 24 * hours;
  const weeks = 7 * days;
  const months = 4 * weeks; // Approximate since months vary in length
  const years = 12 * months;

  if (diff < 10 * seconds) {
    return "Just now";
  } else if (diff < minutes) {
    return `${Math.floor(diff / seconds)} seconds ago`;
  } else if (diff < 2 * minutes) {
    return "A minute ago";
  } else if (diff < hours) {
    return `${Math.floor(diff / minutes)} minutes ago`;
  } else if (diff < 2 * hours) {
    return "An hour ago";
  } else if (diff < days) {
    return `${Math.floor(diff / hours)} hours ago`;
  } else if (diff < 2 * days) {
    return "Yesterday";
  } else if (diff < weeks) {
    return `${Math.floor(diff / days)} days ago`;
  } else if (diff < 2 * weeks) {
    return "Last week";
  } else if (diff < months) {
    return `${Math.floor(diff / weeks)} weeks ago`;
  } else if (diff < 2 * months) {
    return "Last month";
  } else if (diff < years) {
    return `${Math.floor(diff / months)} months ago`;
  } else if (diff < 2 * years) {
    return "Last year";
  } else {
    return `${Math.floor(diff / years)} years ago`;
  }
}

export function fuzzyTimeDiffFuture(targetDate) {
  /**
   * Calculates a human-readable fuzzy time difference between the current time and a given future date.
   *
   * @param {Date} targetDate - The future date to compare with the current time.
   * @returns {string} - A string representing the fuzzy time difference, e.g., "In 5 minutes" or "3 years from now".
   */

  const now = new Date();
  const diff = targetDate - now; // Calculate difference, ensuring it's positive

  // Define time units for better readability
  const seconds = 1000;
  const minutes = 60 * seconds;
  const hours = 60 * minutes;
  const days = 24 * hours;
  const weeks = 7 * days;
  const months = 4 * weeks; // Approximate since months vary in length
  const years = 12 * months;

  if (diff < 10 * seconds) {
    return "Just now";
  } else if (diff < minutes) {
    return `In ${Math.floor(diff / seconds)} seconds`;
  } else if (diff < 2 * minutes) {
    return "In a minute";
  } else if (diff < hours) {
    return `In ${Math.floor(diff / minutes)} minutes`;
  } else if (diff < 2 * hours) {
    return "In an hour";
  } else if (diff < days) {
    return `In ${Math.floor(diff / hours)} hours`;
  } else if (diff < 2 * days) {
    return "Tomorrow";
  } else if (diff < weeks) {
    return `In ${Math.floor(diff / days)} days`;
  } else if (diff < 2 * weeks) {
    return "Next week";
  } else if (diff < months) {
    return `In ${Math.floor(diff / weeks)} weeks`;
  } else if (diff < 2 * months) {
    return "Next month";
  } else if (diff < years) {
    return `In ${Math.floor(diff / months)} months`;
  } else if (diff < 2 * years) {
    return "Next year";
  } else {
    return `In ${Math.floor(diff / years)} years`;
  }
}

export function fuzzyTimeDiff(targetDate) {
  const now = new Date();
  const diff = targetDate - now;

  if (diff < 0) {
    return [fuzzyTimeDiffPast(targetDate), "past"];
  } else if (diff > 0) {
    return [fuzzyTimeDiffFuture(targetDate), "future"];
  } else return ["Just now", "past"];
}

function FundraiserCampaignsContainer({ className }) {
  const navigate = useNavigate();
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

  const fuzzyFormatter = (end_date) => {
    const str = fuzzyTimeDiff(new Date(end_date));
    if (str[1] === "past")
      return <span className="text-red-500 font-bold">{str[0]}</span>;
    else return <span className="text-green-500 font-bold">{str[0]}</span>;
  };

  return (
    <div className={"relative flex-grow shrink-0"}>
      <TableContainer className="absolute w-full h-full" component={Paper}>
        <Table stickyHeader sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Fundraiser Title</b>
              </TableCell>
              <TableCell>
                <b>Fundraiser Unique ID</b>
              </TableCell>
              <TableCell>
                <b>Start date (IST)</b>
              </TableCell>
              <TableCell>
                <b>End date (IST)</b>
              </TableCell>
              <TableCell>
                <b>End date ETA</b>
              </TableCell>
              <TableCell>
                <b>Progress</b>
              </TableCell>
              <TableCell>
                <b>Last Updated (IST)</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fundraiserList.map((row) => (
              <TableRow
                className="group cursor-pointer hover:bg-slate-100"
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/dashboard/fundraising/${row._id}`)}
              >
                <TableCell component="th" scope="row">
                  <div className="whitespace-nowrap flex-row place-items-center font-bold text-blue-500">
                    {row.title}
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="flex whitespace-nowrap flex-row place-items-center">
                    <code>{row._id}</code>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.start_date).toLocaleString("en-in", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.end_date).toLocaleString("en-in", {
                    timeZone: "Asia/Kolkata",
                  })}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {fuzzyFormatter(row.end_date)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex flex-col w-[250px]">
                    <span className="text-xs flex justify-between">
                      <span>
                        ₹{" "}
                        {parseFloat(row.current_amount).toLocaleString(
                          "en-IN",
                          { minimumFractionDigits: 2 }
                        )}{" "}
                        raised
                      </span>
                      <span>
                        ₹{" "}
                        {parseFloat(row.target_amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </span>
                    <div className="rounded-full h-[5px] w-full overflow-hidden bg-neutral-200">
                      <div
                        className="bg-blue-400 h-full rounded-r-full"
                        style={{
                          width: `${Math.floor(
                            (parseFloat(row.current_amount) /
                              parseFloat(row.target_amount)) *
                              100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {new Date(row.updated_at).toLocaleString("en-in", {
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

export default FundraiserCampaignsContainer;
