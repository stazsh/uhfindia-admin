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
import UVolunteers from "../applets/users/UVolunteers";
import UAdmininstrators from "../applets/users/UAdmininstrators";
import Feedback from "../applets/feedback/Feedback";
import UserSettings from "../applets/cog/UserSettings";
import { IoReceiptOutline } from "react-icons/io5";
import Receipt from "../applets/receipt/Receipt";

export const paneTopElements = [
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
  /* {
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
  }, */
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
        title: "Volunteers",
        navlink: function () {
          return "/dashboard/users/volunteer/*";
        },
        element: <UVolunteers />,
      },
      {
        title: "Administrators",
        navlink: function () {
          return "/dashboard/users/admin/*";
        },
        element: <UAdmininstrators />,
      },
    ],
  },
  /* {
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
  }, */
  {
    id: "pane-receipt",
    label: "Generate Receipt",
    icon: <IoReceiptOutline fontSize={26} />,
    navlink: "/dashboard/receipt",
    tabs: [
      {
        title: "Receipt",
        navlink: function () {
          return "/dashboard/receipt/*";
        },
        element: <Receipt />,
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
        title: "User Settings",
        navlink: function () {
          return "/dashboard/settings/user/*";
        },
        element: <UserSettings />,
      },
    ],
  },
];
