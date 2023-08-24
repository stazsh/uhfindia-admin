import {
  paneBottomElements,
  paneTopElements,
} from "../ui-config/Navigation.config";
import { FaChevronRight } from "react-icons/fa";
import "../styles/navigation-pane.css";
import { useContext, useEffect, useState } from "react";
import { Route, useNavigate, Routes, useLocation } from "react-router-dom";
import TabBar from "./TabBar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { DialogContext } from "../context/DialogContext";
import { Button } from "@mui/material";
import { uid } from "uid";

const homeId = "pane-applications";

function NavigationPane() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paneSelection, setPaneSelection] = useState(homeId);

  const { showDialog, setShowDialog } = useContext(DialogContext);

  useEffect(() => {
    for (var k = 0; k < gRouteArray.length; k++) {
      if (
        location.pathname.split("/").slice(0, 3).join("/") ===
        gRouteArray[k].parentPath
      ) {
        handlePaneItemClick(null, gRouteArray[k].id);
      }
    }
  }, [location.pathname]);

  const gRouteArray = (function () {
    var routeArray = [];
    const arr = [paneTopElements, paneBottomElements];

    for (var i = 0; i < arr.length; i++)
      for (var j = 0; j < arr[i].length; j++)
        for (var k = 0; k < arr[i][j].tabs.length; k++)
          routeArray.push({
            id: arr[i][j].id,
            parentPath: arr[i][j].navlink,
            path: arr[i][j].tabs[k].navlink(),
            tabs: arr[i][j].tabs,
            activeTabTitle: arr[i][j].tabs[k].title,
            element: arr[i][j].tabs[k].element,
          });

    return routeArray;
  })();

  function handlePaneItemClick(_, id = null) {
    document.getElementById(paneSelection).classList.remove("fill-other");
    document.getElementById(paneSelection).classList.add("text-white");

    setPaneSelection(id);
    const currentTarget = document.getElementById(id);
    currentTarget.classList.remove("text-white");
    currentTarget.classList.add("fill-other");
  }

  // NOTE: `paneTopAddons` must be API generated and tailored for owners

  return (
    <div className="flex flex-row h-full w-full">
      <div
        id="nav-pane"
        className="relative flex-shrink-0 pt-1.5 flex group flex-col border-r border-boundary justify-between resize-x h-full box-border w-fit px-3 transition"
      >
        <div className="space-y-3 pt-2">
          {paneTopElements.map((i) => (
            <div
              key={i.id}
              id={i.id}
              onClick={(e) => {
                navigate(
                  i.tabs[0]
                    .navlink()
                    .substring(0, i.tabs[0].navlink().length - 2)
                );
              }}
              className="text-white flex flex-row place-items-center box-border outline-none hover:bg-[#ffffff44] active:bg-slate-200 active:text-black transition-colors cursor-pointer p-3 rounded-xl"
            >
              {i.icon}
              <div className="pl-3 capitalize pr-2 pane-item-label text-sm text-inherit font-semibold">
                {i.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 pb-2">
          {paneBottomElements.map((i) => (
            <div
              key={i.id}
              id={i.id}
              onClick={(e) => {
                navigate(
                  i.tabs[0]
                    .navlink()
                    .substring(0, i.tabs[0].navlink().length - 2)
                );
              }}
              className="text-white flex flex-row place-items-center box-border outline-none  hover:bg-[#ffffff44] active:bg-slate-200 active:text-black transition-colors cursor-pointer p-3 rounded-xl"
            >
              {i.icon}
              <div className="pl-3 capitalize pr-2 pane-item-label text-sm text-inherit font-semibold overflow-hidden">
                {i.label}
              </div>
            </div>
          ))}
        </div>

        <div
          onClick={() => {
            const htmlCollection =
              document.getElementsByClassName("pane-item-label");
            for (var i = 0; i < htmlCollection.length; i++)
              htmlCollection[i].classList.toggle("hidden");
            document
              .getElementById("pane-retractor")
              .classList.toggle("rotatecw-180");
          }}
          className="absolute right-0 translate-x-1/2 cursor-pointer shadow-md shadow-[#00000030] shado ring-blue-500 hover:ring-4 transition duration-300 p-2 bg-white text-blue-600 top-1/2 -translate-y-1/2 rounded-full"
        >
          <FaChevronRight
            id="pane-retractor"
            className="rotatecw-180"
            fontSize={10}
          />
        </div>
      </div>

      <div
        className="flex-grow flex flex-col overflow-auto"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <Routes>
          {gRouteArray.map((i) => (
            <Route
              key={i.path.split("/").slice(2).join("/")}
              path={i.path.split("/").slice(2).join("/")}
              element={
                <TabBar tabs={i.tabs} activeTabTitle={i.activeTabTitle} />
              }
            />
          ))}
        </Routes>
        <div
          id="dynamic-container"
          className="overflow-auto"
          style={{ height: "calc(100% - 4rem)" }}
        >
          <Routes>
            {gRouteArray.map((i) => (
              <Route
                key={i.path.split("/").slice(2).join("/")}
                path={i.path.split("/").slice(2).join("/")}
                element={i.element}
              />
            ))}
          </Routes>
        </div>
        <div>
          <Dialog open={Boolean(showDialog)}>
            {Boolean(showDialog) ? (
              <DialogContent>
                {showDialog.message}
                {showDialog.buttons.map((button) => (
                  <DialogActions key={uid(10)}>
                    <Button autoFocus onClick={button.onClick}>
                      {button.label}
                    </Button>
                  </DialogActions>
                ))}
              </DialogContent>
            ) : null}
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default NavigationPane;