import { Route, Routes } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import ApplicationPreview from "./ApplicationPreview";
import VAppListContainerMui from "./VAppListContainerMui";
import NativeButton from "../../components/NativeButton";
import { FiDownloadCloud } from "react-icons/fi";
import fs from "fs";
import { axiosInstance } from "../../api/axiosConfig";

async function downloadExcelFile() {
  try {
    const url = "https://api.uhfindia.org/v1/dash/downloads/xlsx/vapplications";

    const response = await axiosInstance().get(
      "/downloads/xlsx/vapplications",
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    // Create a temporary URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "vapplications." + Date.now() + ".xlsx"; // Set the file name
    link.style.display = "none";

    // Append the anchor element to the document body and click it programmatically
    document.body.appendChild(link);
    link.click();

    // Clean up - remove the anchor element and revoke the blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
}

function VApplications() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="w-full h-full flex flex-col space-y-8 p-8">
            <div className="flex flex-row mob:flex-col">
              <SectionHeader
                title={"Application Manager"}
                subtitle="Manage your volunteer application pool."
              />

              <div className="flex flex-row justify-end mob:mt-4">
                <NativeButton
                  IconType={FiDownloadCloud}
                  text={"Download Excel Sheet"}
                  type={"green"}
                  onClick={() => downloadExcelFile()}
                />
              </div>
            </div>

            <VAppListContainerMui />
          </div>
        }
      />

      <Route path="/:id" element={<ApplicationPreview />} />
    </Routes>
  );
}

export default VApplications;
