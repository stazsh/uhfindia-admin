import { SlPeople } from "react-icons/sl";
import {
  LiaClipboardListSolid,
  LiaCogSolid,
  LiaRupeeSignSolid,
} from "react-icons/lia";
import { BiDonateHeart } from "react-icons/bi";
import { VscFeedback } from "react-icons/vsc";
import VApplications from "../applets/applications/VApplications";
import Fundraising from "../applets/fundraising/Fundraising";
import Transactions from "../applets/transactions/Transactions";
import UCommunity from "../applets/users/UCommunity";
import UVolunteers from "../applets/users/UVolunteers";
import UAdmininstrators from "../applets/users/UAdmininstrators";
import Feedback from "../applets/feedback/Feedback";

export const paneTopElements = [
  {
    id: "pane-applications",
    label: "Volunteer Applications",
    icon: <LiaClipboardListSolid fontSize={26} />,
    navlink: "/dashboard/volunteer-applications",
    tabs: [
      {
        title: "Applications",
        navlink: function () {
          return "/dashboard/volunteer-applications/*";
        },
        element: <VApplications />,
      },
    ],
  },
  {
    id: "pane-fundraising",
    label: "Fundraising",
    icon: <BiDonateHeart fontSize={26} />,
    navlink: "/dashboard/fundraising",
    tabs: [
      {
        title: "Fundraising",
        navlink: function () {
          return "/dashboard/fundraising/*";
        },
        element: <Fundraising />,
      },
    ],
  },
  {
    id: "pane-transactions",
    label: "Transactions",
    icon: <LiaRupeeSignSolid fontSize={26} />,
    navlink: "/dashboard/transactions",
    tabs: [
      {
        title: "Transactions",
        navlink: function () {
          return "/dashboard/transactions/*";
        },
        element: <Transactions />,
      },
    ],
  },
  {
    id: "pane-users",
    label: "Users",
    icon: <SlPeople fontSize={26} />,
    navlink: "/dashboard/users",
    tabs: [
      {
        title: "Community",
        navlink: function () {
          return "/dashboard/users/extra/*";
        },
        element: <UCommunity />,
      },
      {
        title: "Volunteers",
        navlink: function () {
          return "/dashboard/users/volunteers/*";
        },
        element: <UVolunteers />,
      },
      {
        title: "Administrators",
        navlink: function () {
          return "/dashboard/users/administrators/*";
        },
        element: <UAdmininstrators />,
      },
    ],
  },
  {
    id: "pane-feedback",
    label: "Feedback",
    icon: <VscFeedback fontSize={26} />,
    navlink: "/dashboard/feedback",
    tabs: [
      {
        title: "Feedback",
        navlink: function () {
          return "/dashboard/feedback/*";
        },
        element: <Feedback />,
      },
    ],
  },
];

export const paneBottomElements = [
  {
    id: "pane-settings",
    label: "Settings",
    icon: <LiaCogSolid fontSize={26} />,
    navlink: "/dashboard/settings",
    tabs: [
      {
        title: "Dashboard Settings",
        navlink: function () {
          return "/dashboard/settings/dashboard/*";
        },
        element: <div>dash settings</div>,
      },
      {
        title: "User Settings",
        navlink: function () {
          return "/dashboard/settings/user/*";
        },
        element: <div>user settings</div>,
      },
    ],
  },
];
