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
        element: "transactions",
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
        title: "Extra-organisational",
        navlink: function () {
          return "/dashboard/users/extra/*";
        },
        element: "extraorganisationals list",
      },
      {
        title: "Volunteers",
        navlink: function () {
          return "/dashboard/users/volunteers/*";
        },
        element: "volunteer list",
      },
      {
        title: "Administrators",
        navlink: function () {
          return "/dashboard/users/administrators/*";
        },
        element: "admin list",
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
        element: <div>"feedback"</div>,
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
