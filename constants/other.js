export const userRoles = ["superadmin", "admin", "volunteer"];

export function downloadPDF(pdfUrl) {
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = pdfUrl.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
