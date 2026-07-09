import { pdf } from "@react-pdf/renderer";
import InvoicePdf from "./InvoicePdf";

async function generatePdfBlob(data) {
  const doc = <InvoicePdf {...data} />;
  return await pdf(doc).toBlob();
}

export async function downloadInvoicePdf(data, filename = "invoice.pdf") {
  const blob = await generatePdfBlob(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function shareInvoiceOnWhatsapp(
  data,
  filename = "invoice.pdf",
  message = "Please find the invoice attached.",
) {
  const blob = await generatePdfBlob(data);
  const file = new File([blob], filename, { type: "application/pdf" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Invoice", text: message });
      return { method: "share" };
    } catch (err) {
      if (err?.name === "AbortError") return { method: "cancelled" };
    }
  }

  await downloadInvoicePdf(data, filename);
  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    message + " (PDF downloaded — please attach it manually)",
  )}`;
  window.open(waUrl, "_blank");
  return { method: "fallback" };
}
