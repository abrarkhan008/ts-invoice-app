// import { useMemo, useRef, useState } from "react";
// import ItemsTable from "./components/ItemsTable";
// import SignaturePad from "./components/SignaturePad";
// import { amountInWords } from "./utils/numberToWords";
// import { downloadInvoicePdf, shareInvoiceOnWhatsapp } from "./utils/pdfExport";

// function todayFormatted() {
//   const d = new Date();
//   return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
// }

// let idCounter = 1;
// const newItem = () => ({
//   id: idCounter++,
//   particulars: "",
//   hsn: "",
//   qty: "",
//   rate: "",
//   amount: "",
// });

// const lineInput =
//   "bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy w-full text-[13px] sm:text-sm px-0.5 py-0.5 text-invoice-navy placeholder:text-invoice-navy/30";

// const metaValueInput =
//   "bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy text-[13px] sm:text-sm px-1 text-invoice-navy w-full text-right placeholder:text-invoice-navy/30";

// export default function App() {
//   const printRef = useRef(null);
//   const [busy, setBusy] = useState(false);

//   const [client, setClient] = useState({ name: "", addr1: "", addr2: "" });
//   const [meta, setMeta] = useState({
//     invoiceNo: "001",
//     date: todayFormatted(),
//     dcNo: "",
//     dcDate: "",
//     customerGst: "",
//     ewayBill: "",
//   });

//   const [items, setItems] = useState([newItem()]);
//   const [gst, setGst] = useState({ sgst: 9, cgst: 9, igst: 0 });
//   const [customerSig, setCustomerSig] = useState("");
//   const [authSig, setAuthSig] = useState("");

//   const updateItem = (id, field, value) => {
//     setItems((prev) =>
//       prev.map((it) => {
//         if (it.id !== id) return it;
//         const updated = { ...it, [field]: value };
//         if (field === "qty" || field === "rate") {
//           const q = parseFloat(field === "qty" ? value : it.qty) || 0;
//           const r = parseFloat(field === "rate" ? value : it.rate) || 0;
//           updated.amount = q && r ? (q * r).toFixed(2) : updated.amount;
//         }
//         return updated;
//       }),
//     );
//   };

//   const addItem = () => setItems((prev) => [...prev, newItem()]);
//   const removeItem = (id) =>
//     setItems((prev) => prev.filter((it) => it.id !== id));

//   const totalValue = useMemo(
//     () => items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0),
//     [items],
//   );

//   const sgstAmt = (totalValue * (parseFloat(gst.sgst) || 0)) / 100;
//   const cgstAmt = (totalValue * (parseFloat(gst.cgst) || 0)) / 100;
//   const igstAmt = (totalValue * (parseFloat(gst.igst) || 0)) / 100;
//   const grandTotal = totalValue + sgstAmt + cgstAmt + igstAmt;

//   const words = useMemo(() => amountInWords(grandTotal), [grandTotal]);

//   const fileName = `Invoice-${meta.invoiceNo || "TS"}.pdf`;

//   const handleDownload = async () => {
//     setBusy(true);
//     try {
//       await downloadInvoicePdf(printRef.current, fileName);
//     } finally {
//       setBusy(false);
//     }
//   };

//   const handleShare = async () => {
//     setBusy(true);
//     try {
//       await shareInvoiceOnWhatsapp(
//         printRef.current,
//         fileName,
//         `Invoice No. ${meta.invoiceNo} from TS Fabrication — Grand Total ₹${grandTotal.toFixed(
//           2,
//         )}`,
//       );
//     } finally {
//       setBusy(false);
//     }
//   };

//   const money = (n) =>
//     n.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   return (
//     <div className="min-h-screen bg-invoice-navy/5 py-4 px-2 sm:px-6">
//       <div
//         id="invoice-print-area"
//         ref={printRef}
//         className="max-w-3xl mx-auto bg-invoice-paper border-2 border-invoice-navy rounded-sm shadow-xl p-3 sm:p-6 font-serif text-invoice-navy"
//       >
//         {/* ---------- HEADER ----------
//         <div className="border-b-2 border-invoice-navy pb-2">
//           <div className="flex justify-between items-start text-[10px] sm:text-xs font-bold gap-1">
//             <span>GST : GST 29AGMPT0667J1ZO</span>
//             <span className="text-right leading-tight">
//               Cell : 99027 40570
//               <br />
//               86603 32757
//             </span>
//           </div>

//           <div className="flex items-center justify-center gap-2 sm:gap-3 mt-1">
//             <img
//               src="/logo.png"
//               alt="TS Fabrication logo"
//               className="w-12 h-12 sm:w-16 sm:h-16 shrink-0 object-contain"
//             />
//             <div className="text-center">
//               <p className="text-[8px] sm:text-[10px] uppercase tracking-widest font-bold underline">
//                 Tax Invoice
//               </p>
//               <h1 className="text-xl sm:text-3xl font-bold tracking-wide -mt-0.5">
//                 TS FABRICATION
//               </h1>
//             </div>
//           </div>

//           <p className="text-center text-[10px] sm:text-xs font-semibold mt-1 leading-tight">
//             Mfg. of : All kinds of Brass Railings, Antique Brass Railings and
//             Stainless Steel Railings,
//             <br />
//             Power Coatings Railings, Fabrication with 304 &amp; 316 Grade
//           </p>
//           <p className="text-center text-[9px] sm:text-[11px] mt-1 leading-tight">
//             # 26, Nandini Layout, Outer Ring Road, Kanteerava Studio Circle,
//             Sonal Garments Road,
//             <br />
//             Near Saneshwara Temple, Bangalore - 560 096. E-mail :
//             tsfabrication@gmail.com
//           </p>
//         </div> */}
//         {/* ---------- HEADER ---------- */}
//         <div className="border-b-2 border-invoice-navy pb-2">
//           <div className="flex justify-between text-[11px] font-bold">
//             <span>GST : GST 29AGMPT0667J1ZO</span>

//             <div className="text-right leading-tight">
//               <div>Cell : 99027 40570</div>
//               <div>86603 32757</div>
//             </div>
//           </div>

//           <div className="flex items-center mt-2">
//             <img
//               src="/logo.png"
//               alt="TS Fabrication"
//               className="w-32 h-21 object-contain mr-4"
//             />

//             <div className="flex-1 text-center">
//               <div className="text-xl font-extrabold tracking-wide">
//                 TAX INVOICE
//               </div>

//               <div className="text-5xl font-extrabold leading-none mt-1">
//                 TS FABRICATION
//               </div>

//               <div className="mt-2 text-[14px] font-semibold leading-snug">
//                 Mfg. of : All kinds of Brass Railings, Antique Brass Railings
//                 and Stainless Steel Railings,
//                 <br />
//                 Power Coatings Railings, Fabrication with 304 &amp; 316 Grade
//               </div>

//               <div className="mt-2 text-[13px] leading-snug">
//                 # 26, Nandini Layout, Outer Ring Road, Kanteerava Studio Circle,
//                 Sonal Garments Road,
//                 <br />
//                 Near Saneshwara Temple, Bangalore - 560096. E-mail :
//                 tsfabrication@gmail.com
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ---------- CLIENT + META ---------- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 border-x-2 border-invoice-navy">
//           <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy space-y-2">
//             <div className="flex items-baseline gap-1">
//               <span className="text-[13px] sm:text-sm font-semibold shrink-0">
//                 M/s.
//               </span>
//               <input
//                 className={lineInput}
//                 placeholder="Client / company name"
//                 value={client.name}
//                 onChange={(e) =>
//                   setClient((c) => ({ ...c, name: e.target.value }))
//                 }
//               />
//             </div>
//             <input
//               className={lineInput}
//               placeholder="Address line 1"
//               value={client.addr1}
//               onChange={(e) =>
//                 setClient((c) => ({ ...c, addr1: e.target.value }))
//               }
//             />
//             <input
//               className={lineInput}
//               placeholder="Address line 2"
//               value={client.addr2}
//               onChange={(e) =>
//                 setClient((c) => ({ ...c, addr2: e.target.value }))
//               }
//             />
//           </div>

//           <div className="text-[13px] sm:text-sm">
//             <div className="flex border-b border-invoice-navy/40">
//               <div className="flex items-center gap-1 px-2 py-1.5 flex-1 border-r border-invoice-navy/40">
//                 <span className="font-semibold shrink-0">Invoice No.</span>
//                 <input
//                   className={metaValueInput}
//                   value={meta.invoiceNo}
//                   onChange={(e) =>
//                     setMeta((m) => ({ ...m, invoiceNo: e.target.value }))
//                   }
//                 />
//               </div>
//               <div className="flex items-center gap-1 px-2 py-1.5 flex-1">
//                 <span className="font-semibold shrink-0">Date :</span>
//                 <input
//                   className={metaValueInput}
//                   value={meta.date}
//                   onChange={(e) =>
//                     setMeta((m) => ({ ...m, date: e.target.value }))
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex border-b border-invoice-navy/40">
//               <div className="flex items-center gap-1 px-2 py-1.5 flex-1 border-r border-invoice-navy/40">
//                 <span className="font-semibold shrink-0">D.C. No.</span>
//                 <input
//                   className={metaValueInput}
//                   value={meta.dcNo}
//                   onChange={(e) =>
//                     setMeta((m) => ({ ...m, dcNo: e.target.value }))
//                   }
//                 />
//               </div>
//               <div className="flex items-center gap-1 px-2 py-1.5 flex-1">
//                 <span className="font-semibold shrink-0">Date :</span>
//                 <input
//                   className={metaValueInput}
//                   value={meta.dcDate}
//                   onChange={(e) =>
//                     setMeta((m) => ({ ...m, dcDate: e.target.value }))
//                   }
//                 />
//               </div>
//             </div>
//             <div className="flex items-center gap-1 px-2 py-1.5 border-b border-invoice-navy/40">
//               <span className="font-semibold shrink-0">Customer GST :</span>
//               <input
//                 className={metaValueInput}
//                 value={meta.customerGst}
//                 onChange={(e) =>
//                   setMeta((m) => ({ ...m, customerGst: e.target.value }))
//                 }
//               />
//             </div>
//             <div className="flex items-center gap-1 px-2 py-1.5">
//               <span className="font-semibold shrink-0">E Way Bill No. :</span>
//               <input
//                 className={metaValueInput}
//                 value={meta.ewayBill}
//                 onChange={(e) =>
//                   setMeta((m) => ({ ...m, ewayBill: e.target.value }))
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* ---------- ITEMS ---------- */}
//         <ItemsTable
//           items={items}
//           onUpdate={updateItem}
//           onAdd={addItem}
//           onRemove={removeItem}
//         />

//         {/* ---------- TOTALS + WORDS ---------- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-t-0 border-invoice-navy">
//           <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy flex flex-col justify-between gap-2">
//             <div>
//               <p className="text-[13px] sm:text-sm font-semibold">Rupees</p>
//               <p className="text-[12px] sm:text-sm italic leading-snug border-b border-dotted border-invoice-navy/50 pb-1 min-h-[2.5rem]">
//                 {grandTotal > 0 ? words : "—"}
//               </p>
//             </div>
//           </div>
//           <div className="text-[13px] sm:text-sm">
//             <Row label="Total Value">
//               <span className="font-semibold pr-2">{money(totalValue)}</span>
//             </Row>
//             <Row
//               label={
//                 <span className="flex items-center gap-1">
//                   SGST @
//                   <PctInput
//                     value={gst.sgst}
//                     onChange={(v) => setGst((g) => ({ ...g, sgst: v }))}
//                   />
//                   %
//                 </span>
//               }
//             >
//               <span className="pr-2">{money(sgstAmt)}</span>
//             </Row>
//             <Row
//               label={
//                 <span className="flex items-center gap-1">
//                   CGST @
//                   <PctInput
//                     value={gst.cgst}
//                     onChange={(v) => setGst((g) => ({ ...g, cgst: v }))}
//                   />
//                   %
//                 </span>
//               }
//             >
//               <span className="pr-2">{money(cgstAmt)}</span>
//             </Row>
//             <Row
//               label={
//                 <span className="flex items-center gap-1">
//                   IGST @
//                   <PctInput
//                     value={gst.igst}
//                     onChange={(v) => setGst((g) => ({ ...g, igst: v }))}
//                   />
//                   %
//                 </span>
//               }
//             >
//               <span className="pr-2">{money(igstAmt)}</span>
//             </Row>
//             <div className="flex justify-between items-center px-2 py-2 bg-invoice-navy/10 font-bold">
//               <span>GRAND TOTAL</span>
//               <span className="pr-2">₹ {money(grandTotal)}</span>
//             </div>
//           </div>
//         </div>

//         {/* ---------- TERMS + SIGNATURES ---------- */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-t-0 border-invoice-navy">
//           <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy flex flex-col gap-3">
//             <div>
//               <p className="text-[12px] sm:text-sm font-semibold mb-1">
//                 Terms &amp; Conditions :
//               </p>
//               <ul className="text-[10px] sm:text-xs list-disc pl-4 space-y-0.5 leading-snug">
//                 <li>Goods once sold cannot be taken back or exchanged.</li>
//                 <li>
//                   We will not accept any responsibility or admit any claim
//                   shortage of goods once leave our place.
//                 </li>
//                 <li>
//                   All warranties / guaranties to be claimed directly from
//                   company, we are not liable for the same.
//                 </li>
//               </ul>
//             </div>
//             <div className="mt-auto pt-2">
//               <SignaturePad
//                 label="Customer Signature with Seal"
//                 value={customerSig}
//                 onChange={setCustomerSig}
//               />
//             </div>
//           </div>
//           <div className="p-2 flex flex-col items-center justify-between gap-3">
//             <p className="text-[13px] sm:text-sm">
//               For <span className="font-bold">TS FABRICATION</span>
//             </p>
//             <div className="w-full mt-auto">
//               <SignaturePad
//                 label="Authorised Signatory"
//                 value={authSig}
//                 onChange={setAuthSig}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ---------- ACTION BAR (not exported to PDF) ---------- */}
//       <div className="max-w-3xl mx-auto mt-4 flex flex-wrap gap-2 justify-center print:hidden">
//         <button
//           onClick={handleDownload}
//           disabled={busy}
//           className="px-4 py-2.5 rounded-lg bg-invoice-navy text-white text-sm font-semibold shadow hover:bg-invoice-navyDark active:scale-95 transition disabled:opacity-50"
//         >
//           {busy ? "Working…" : "⬇ Download PDF"}
//         </button>
//         <button
//           onClick={handleShare}
//           disabled={busy}
//           className="px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow hover:brightness-95 active:scale-95 transition disabled:opacity-50"
//         >
//           {busy ? "Working…" : "Share on WhatsApp"}
//         </button>
//         <button
//           onClick={() => window.print()}
//           className="px-4 py-2.5 rounded-lg bg-white border-2 border-invoice-navy text-invoice-navy text-sm font-semibold shadow hover:bg-invoice-navy/5 active:scale-95 transition"
//         >
//           🖨 Print
//         </button>
//       </div>

//       <p className="text-center text-[11px] text-invoice-navy/50 mt-4 print:hidden">
//         Tip: tap any field on the invoice above to edit it directly.
//       </p>
//     </div>
//   );
// }

// function Row({ label, children }) {
//   return (
//     <div className="flex justify-between items-center px-2 py-1.5 border-b border-invoice-navy/40">
//       <span className="font-semibold">{label}</span>
//       {children}
//     </div>
//   );
// }

// function PctInput({ value, onChange }) {
//   return (
//     <input
//       type="number"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="w-10 bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy text-center"
//     />
//   );
// }
import { useMemo, useRef, useState } from "react";
import ItemsTable from "./components/ItemsTable";
import SignaturePad from "./components/SignaturePad";
import { amountInWords } from "./utils/numberToWords";
import { downloadInvoicePdf, shareInvoiceOnWhatsapp } from "./pdf/pdfExport";

function todayFormatted() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

let idCounter = 1;
const newItem = () => ({
  id: idCounter++,
  particulars: "",
  hsn: "",
  qty: "",
  rate: "",
  amount: "",
});

const lineInput =
  "bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy w-full text-[13px] sm:text-sm px-0.5 py-0.5 text-invoice-navy placeholder:text-invoice-navy/30";

const metaValueInput =
  "bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy text-[13px] sm:text-sm px-1 text-invoice-navy w-full placeholder:text-invoice-navy/30";

export default function App() {
  const printRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const [client, setClient] = useState({ name: "", addr1: "", addr2: "" });
  const [meta, setMeta] = useState({
    invoiceNo: "001",
    date: todayFormatted(),
    dcNo: "",
    dcDate: "",
    customerGst: "",
    ewayBill: "",
  });

  const [items, setItems] = useState([newItem()]);
  const [gst, setGst] = useState({ sgst: 9, cgst: 9, igst: 0 });
  const [customerSig, setCustomerSig] = useState("");
  const [authSig, setAuthSig] = useState("");

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const updated = { ...it, [field]: value };
        if (field === "qty" || field === "rate") {
          const q = parseFloat(field === "qty" ? value : it.qty) || 0;
          const r = parseFloat(field === "rate" ? value : it.rate) || 0;
          updated.amount = q && r ? (q * r).toFixed(2) : "";
        }
        return updated;
      }),
    );
  };

  const addItem = () => setItems((prev) => [...prev, newItem()]);
  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const totalValue = useMemo(
    () => items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0),
    [items],
  );

  const sgstAmt = (totalValue * (parseFloat(gst.sgst) || 0)) / 100;
  const cgstAmt = (totalValue * (parseFloat(gst.cgst) || 0)) / 100;
  const igstAmt = (totalValue * (parseFloat(gst.igst) || 0)) / 100;
  const grandTotal = totalValue + sgstAmt + cgstAmt + igstAmt;

  const words = useMemo(() => amountInWords(grandTotal), [grandTotal]);

  const fileName = `Invoice-${meta.invoiceNo || "TS"}.pdf`;

  // const handleDownload = async () => {
  //   setBusy(true);
  //   try {
  //     await downloadInvoicePdf(printRef.current, fileName);
  //   } finally {
  //     setBusy(false);
  //   }
  // };

  // const handleShare = async () => {
  //   setBusy(true);
  //   try {
  //     await shareInvoiceOnWhatsapp(
  //       printRef.current,
  //       fileName,
  //       `Invoice No. ${meta.invoiceNo} from TS Fabrication — Grand Total Rs. ${grandTotal.toFixed(
  //         2,
  //       )}`,
  //     );
  //   } finally {
  //     setBusy(false);
  //   }
  // };
  const pdfData = {
    client,
    meta,
    items,
    gst,
    totalValue,
    sgstAmt,
    cgstAmt,
    igstAmt,
    grandTotal,
    words,
    customerSig,
    authSig,
    logoUrl: `${window.location.origin}/logo.png`,
  };

  const handleDownload = async () => {
    setBusy(true);
    try {
      await downloadInvoicePdf(pdfData, fileName);
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    setBusy(true);
    try {
      await shareInvoiceOnWhatsapp(
        pdfData,
        fileName,
        `Invoice No. ${meta.invoiceNo} from TS Fabrication — Grand Total Rs. ${grandTotal.toFixed(2)}`,
      );
    } finally {
      setBusy(false);
    }
  };
  const handleWhatsAppShare = () => {
    const message = `Invoice No. ${meta.invoiceNo} from TS Fabrication — Grand Total Rs. ${grandTotal.toFixed(
      2,
    )}. (Tap Print, choose "Save as PDF", then attach it here.)`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const money = (n) =>
    n.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-invoice-navy/5 py-4 px-2 sm:px-6">
      <div
        id="invoice-print-area"
        ref={printRef}
        className="max-w-3xl mx-auto bg-invoice-paper border-2 border-invoice-navy rounded-sm shadow-xl p-3 sm:p-6 font-serif text-invoice-navy"
      >
        {/* ---------- HEADER ---------- */}
        <div className="border-b-2 border-invoice-navy pb-2">
          <div className="flex justify-between items-start text-[10px] sm:text-xs font-bold gap-1">
            <span>GST : GST 29AGMPT0667J1ZO</span>
            <span className="text-right leading-tight">
              Cell : 99027 40570
              <br />
              86603 32757
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 mt-1">
            <img
              src="/logo.png"
              alt="TS Fabrication logo"
              className="w-28 h-28 sm:w-40 sm:h-36 shrink-0 object-contain"
            />
            <div className="flex-1 text-center">
              <p className="text-[9px] sm:text-xs uppercase tracking-widest font-bold underline">
                Tax Invoice
              </p>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-wide -mt-0.5">
                TS FABRICATION
              </h1>
            </div>
            {/* spacer so the title stays visually centered against the logo */}
            <div className="w-14 sm:w-20 shrink-0 hidden sm:block" />
          </div>

          <p className="text-center text-[10px] sm:text-xs font-semibold mt-1 leading-tight">
            Mfg. of : All kinds of Brass Railings, Antique Brass Railings and
            Stainless Steel Railings,
            <br />
            Power Coatings Railings, Fabrication with 304 &amp; 316 Grade
          </p>
          <p className="text-center text-[9px] sm:text-[11px] mt-1 leading-tight">
            #32, 1st A Main Road, Parimala Nagar, Nandini layout - 560096
            <br />
            Bangalore - 560 096. E-mail : tsfabrication@gmail.com
          </p>
        </div>

        {/* ---------- CLIENT + META ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-x-2 border-invoice-navy">
          <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy space-y-2">
            <div className="flex items-baseline gap-1">
              <span className="text-[13px] sm:text-sm font-semibold shrink-0">
                M/s.
              </span>
              <input
                className={lineInput}
                placeholder="Client / company name"
                value={client.name}
                onChange={(e) =>
                  setClient((c) => ({ ...c, name: e.target.value }))
                }
              />
            </div>
            <input
              className={lineInput}
              placeholder="Address line 1"
              value={client.addr1}
              onChange={(e) =>
                setClient((c) => ({ ...c, addr1: e.target.value }))
              }
            />
            <input
              className={lineInput}
              placeholder="Address line 2 / GSTIN"
              value={client.addr2}
              onChange={(e) =>
                setClient((c) => ({ ...c, addr2: e.target.value }))
              }
            />
          </div>

          <div className="text-[13px] sm:text-sm">
            <div className="flex border-b border-invoice-navy/40">
              <div className="flex items-center gap-1 px-2 py-1.5 flex-1 border-r border-invoice-navy/40">
                <span className="font-semibold shrink-0">Invoice No.</span>
                <input
                  className={metaValueInput + " text-red-600 font-semibold"}
                  value={meta.invoiceNo}
                  onChange={(e) =>
                    setMeta((m) => ({ ...m, invoiceNo: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-1 px-2 py-1.5 flex-1">
                <span className="font-semibold shrink-0">Date :</span>
                <input
                  className={metaValueInput}
                  value={meta.date}
                  onChange={(e) =>
                    setMeta((m) => ({ ...m, date: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex border-b border-invoice-navy/40">
              <div className="flex items-center gap-1 px-2 py-1.5 flex-1 border-r border-invoice-navy/40">
                <span className="font-semibold shrink-0">D.C. No.</span>
                <input
                  className={metaValueInput}
                  value={meta.dcNo}
                  onChange={(e) =>
                    setMeta((m) => ({ ...m, dcNo: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center gap-1 px-2 py-1.5 flex-1">
                <span className="font-semibold shrink-0">Date :</span>
                <input
                  className={metaValueInput}
                  value={meta.dcDate}
                  onChange={(e) =>
                    setMeta((m) => ({ ...m, dcDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1.5 border-b border-invoice-navy/40">
              <span className="font-semibold shrink-0">Customer GST :</span>
              <input
                className={metaValueInput}
                value={meta.customerGst}
                onChange={(e) =>
                  setMeta((m) => ({ ...m, customerGst: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-1 px-2 py-1.5">
              <span className="font-semibold shrink-0">E Way Bill No. :</span>
              <input
                className={metaValueInput}
                value={meta.ewayBill}
                onChange={(e) =>
                  setMeta((m) => ({ ...m, ewayBill: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {/* ---------- ITEMS ---------- */}
        <ItemsTable
          items={items}
          onUpdate={updateItem}
          onAdd={addItem}
          onRemove={removeItem}
        />

        {/* ---------- TOTALS + WORDS ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-t-0 border-invoice-navy">
          <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy flex flex-col justify-between gap-2">
            <div>
              <p className="text-[13px] sm:text-sm font-semibold">Rupees</p>
              <p className="text-[12px] sm:text-sm italic leading-snug border-b border-dotted border-invoice-navy/50 pb-1 min-h-[2.5rem]">
                {grandTotal > 0 ? words : "—"}
              </p>
            </div>
          </div>
          <div className="text-[13px] sm:text-sm">
            <Row label="Total Value">
              <span className="font-semibold pr-2">{money(totalValue)}</span>
            </Row>
            <Row
              label={
                <span className="flex items-center gap-1">
                  SGST @
                  <PctInput
                    value={gst.sgst}
                    onChange={(v) => setGst((g) => ({ ...g, sgst: v }))}
                  />
                  %
                </span>
              }
            >
              <span className="pr-2">{money(sgstAmt)}</span>
            </Row>
            <Row
              label={
                <span className="flex items-center gap-1">
                  CGST @
                  <PctInput
                    value={gst.cgst}
                    onChange={(v) => setGst((g) => ({ ...g, cgst: v }))}
                  />
                  %
                </span>
              }
            >
              <span className="pr-2">{money(cgstAmt)}</span>
            </Row>
            <Row
              label={
                <span className="flex items-center gap-1">
                  IGST @
                  <PctInput
                    value={gst.igst}
                    onChange={(v) => setGst((g) => ({ ...g, igst: v }))}
                  />
                  %
                </span>
              }
            >
              <span className="pr-2">{money(igstAmt)}</span>
            </Row>
            <div className="flex justify-between items-center px-2 py-2 bg-invoice-navy/10 font-bold">
              <span>GRAND TOTAL</span>
              <span className="pr-2">{money(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* ---------- TERMS + SIGNATURES ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-2 border-t-0 border-invoice-navy">
          <div className="p-2 border-b-2 sm:border-b-0 sm:border-r-2 border-invoice-navy flex flex-col gap-3">
            <div>
              <p className="text-[12px] sm:text-sm font-semibold mb-1">
                Terms &amp; Conditions :
              </p>
              <ul className="text-[10px] sm:text-xs list-disc pl-4 space-y-0.5 leading-snug">
                <li>Goods once sold cannot be taken back or exchanged.</li>
                <li>
                  We will not accept any responsibility or admit any claim
                  shortage of goods once leave our place.
                </li>
                <li>
                  All warranties / guaranties to be claimed directly from
                  company, we are not liable for the same.
                </li>
              </ul>
            </div>
            <div className="mt-auto pt-2">
              <SignaturePad
                label="Customer Signature with Seal"
                value={customerSig}
                onChange={setCustomerSig}
              />
            </div>
          </div>
          <div className="p-2 flex flex-col items-center justify-between gap-3">
            <p className="text-[13px] sm:text-sm">
              For <span className="font-bold">TS FABRICATION</span>
            </p>
            <div className="w-full mt-auto">
              <SignaturePad
                label="Authorised Signatory"
                value={authSig}
                onChange={setAuthSig}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ---------- ACTION BAR (not exported to PDF) ---------- */}
      {/* <div className="max-w-3xl mx-auto mt-4 flex flex-wrap gap-2 justify-center print:hidden">
        <button
          onClick={handleDownload}
          disabled={busy}
          className="px-4 py-2.5 rounded-lg bg-invoice-navy text-white text-sm font-semibold shadow hover:bg-invoice-navyDark active:scale-95 transition disabled:opacity-50"
        >
          {busy ? "Working…" : "⬇ Download PDF"}
        </button>
        <button
          onClick={handleShare}
          disabled={busy}
          className="px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow hover:brightness-95 active:scale-95 transition disabled:opacity-50"
        >
          {busy ? "Working…" : "Share on WhatsApp"}
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-lg bg-white border-2 border-invoice-navy text-invoice-navy text-sm font-semibold shadow hover:bg-invoice-navy/5 active:scale-95 transition"
        >
          🖨 Print
        </button>
      </div> */}
      <div className="max-w-3xl mx-auto mt-4 flex flex-wrap gap-2 justify-center print:hidden">
        <button
          onClick={handleDownload}
          disabled={busy}
          className="px-4 py-2.5 rounded-lg bg-invoice-navy text-white text-sm font-semibold shadow hover:bg-invoice-navyDark active:scale-95 transition disabled:opacity-50"
        >
          {busy ? "Working…" : "⬇ Download PDF"}
        </button>
        <button
          onClick={handleShare}
          disabled={busy}
          className="px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow hover:brightness-95 active:scale-95 transition disabled:opacity-50"
        >
          {busy ? "Working…" : "Share on WhatsApp"}
        </button>
      </div>
      <p className="text-center text-[11px] text-invoice-navy/50 mt-4 print:hidden">
        Tip: tap any field on the invoice above to edit it directly.
      </p>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex justify-between items-center px-2 py-1.5 border-b border-invoice-navy/40">
      <span className="font-semibold">{label}</span>
      {children}
    </div>
  );
}

function PctInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-10 bg-transparent outline-none border-b border-dotted border-invoice-navy/50 focus:border-invoice-navy text-center"
    />
  );
}
