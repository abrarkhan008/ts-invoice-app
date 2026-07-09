// import { useRef } from "react";

// const cellInput =
//   "w-full bg-transparent outline-none text-invoice-navy placeholder:text-invoice-navy/30 text-[13px] sm:text-sm px-1 py-1.5";

// export default function ItemsTable({ items, onUpdate, onAdd, onRemove }) {
//   const recognitionRef = useRef(null);

//   const startVoice = (id, currentValue) => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Voice typing isn't supported in this browser. Please try Chrome.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onresult = (e) => {
//       const transcript = e.results[0][0].transcript;
//       const updated = currentValue
//         ? `${currentValue} ${transcript}`
//         : transcript;
//       onUpdate(id, "particulars", updated);
//     };

//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   return (
//     <div className="border-2 border-invoice-navy border-t-0">
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse min-w-[560px] sm:min-w-0">
//           <thead>
//             <tr className="border-b-2 border-invoice-navy text-[12px] font-bold text-center">
//               <th className="border-r border-invoice-navy w-[45px]">
//                 Sl.
//                 <br />
//                 No.
//               </th>

//               <th className="border-r border-invoice-navy w-[420px]">
//                 PARTICULARS
//               </th>

//               <th className="border-r border-invoice-navy w-[90px]">
//                 HSN
//                 <br />
//                 Code
//               </th>

//               <th className="border-r border-invoice-navy w-[70px]">Qty.</th>

//               <th className="border-r border-invoice-navy w-[100px]">Rate</th>

//               <th className="border-r border-invoice-navy" colSpan={2}>
//                 Amount
//               </th>

//               <th
//                 className="print:hidden w-8"
//                 data-html2canvas-ignore="true"
//               ></th>
//             </tr>

//             <tr className="border-b border-invoice-navy text-[11px]">
//               <th className="border-r border-invoice-navy"></th>

//               <th className="border-r border-invoice-navy"></th>

//               <th className="border-r border-invoice-navy"></th>

//               <th className="border-r border-invoice-navy"></th>

//               <th className="border-r border-invoice-navy"></th>

//               <th className="border-r border-invoice-navy w-[90px]">Rs.</th>

//               <th className="border-r border-invoice-navy w-[40px]">Ps.</th>

//               <th className="print:hidden"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, idx) => (
//               <tr
//                 key={item.id}
//                 className="border-b border-invoice-navy/30 align-top h-[42px]"
//               >
//                 <td className="border-r border-invoice-navy/30 text-center text-[13px] sm:text-sm py-1.5 text-invoice-navy/80">
//                   {idx + 1}
//                 </td>
//                 <td className="border-r border-invoice-navy/30 relative">
//                   <textarea
//                     rows={1}
//                     value={item.particulars}
//                     onChange={(e) =>
//                       onUpdate(item.id, "particulars", e.target.value)
//                     }
//                     placeholder="Item description"
//                     className={cellInput + " resize-none leading-snug pr-7"}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => startVoice(item.id, item.particulars)}
//                     title="Speak item description"
//                     data-html2canvas-ignore="true"
//                     className="print:hidden absolute right-0.5 top-1/2 -translate-y-1/2 text-invoice-navy/60 hover:text-invoice-navy text-sm px-1"
//                   >
//                     🎤
//                   </button>
//                 </td>
//                 <td className="border-r border-invoice-navy/30">
//                   <input
//                     value={item.hsn}
//                     onChange={(e) => onUpdate(item.id, "hsn", e.target.value)}
//                     placeholder="—"
//                     className={cellInput + " text-center"}
//                   />
//                 </td>
//                 <td className="border-r border-invoice-navy/30">
//                   <input
//                     type="number"
//                     value={item.qty}
//                     onChange={(e) => onUpdate(item.id, "qty", e.target.value)}
//                     placeholder="0"
//                     className={cellInput + " text-center"}
//                   />
//                 </td>
//                 <td className="border-r border-invoice-navy/30">
//                   <input
//                     type="number"
//                     value={item.rate}
//                     onChange={(e) => onUpdate(item.id, "rate", e.target.value)}
//                     placeholder="0"
//                     className={cellInput + " text-right"}
//                   />
//                 </td>
//                 <td className="border-r border-invoice-navy/30">
//                   <input
//                     type="number"
//                     value={item.amount}
//                     onChange={(e) =>
//                       onUpdate(item.id, "amount", e.target.value)
//                     }
//                     className={cellInput + " text-right"}
//                   />
//                 </td>

//                 <td className="border-r border-invoice-navy/30 text-center">
//                   00
//                 </td>
//                 <td
//                   className="print:hidden text-center"
//                   data-html2canvas-ignore="true"
//                 >
//                   {items.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => onRemove(item.id)}
//                       className="text-invoice-red/70 hover:text-invoice-red text-sm px-1"
//                       title="Remove row"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button
//         type="button"
//         onClick={onAdd}
//         data-html2canvas-ignore="true"
//         className="print:hidden w-full py-2 text-xs sm:text-sm font-semibold text-invoice-navy bg-invoice-navy/5 hover:bg-invoice-navy/10 border-t-2 border-invoice-navy transition"
//       >
//         + Add Item
//       </button>
//     </div>
//   );
// }
const cellInput =
  "w-full bg-transparent outline-none text-invoice-navy placeholder:text-invoice-navy/30 text-[13px] sm:text-sm px-1 py-1.5";

export default function ItemsTable({ items, onUpdate, onAdd, onRemove }) {
  const startVoice = (id, currentValue) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice typing isn't supported in this browser. Please try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      const updated = currentValue
        ? `${currentValue} ${transcript}`
        : transcript;
      onUpdate(id, "particulars", updated);
    };

    recognition.start();
  };

  return (
    <div className="border-2 border-invoice-navy border-t border-t-black-500">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[560px] sm:min-w-0">
          <thead>
            <tr className="border-b-2 border-invoice-navy text-[12px] font-bold text-center">
              <th className="border-r border-invoice-navy w-[45px] py-1">
                Sl.
                <br />
                No.
              </th>

              <th className="border-r border-invoice-navy w-[420px]">
                PARTICULARS
              </th>

              <th className="border-r border-invoice-navy w-[90px]">
                HSN
                <br />
                Code
              </th>

              <th className="border-r border-invoice-navy w-[70px]">Qty.</th>

              <th className="border-r border-invoice-navy w-[100px]">Rate</th>

              <th className="border-r border-invoice-navy" colSpan={2}>
                Amount
              </th>

              <th
                className="print:hidden w-8"
                data-html2canvas-ignore="true"
              ></th>
            </tr>

            <tr className="border-b border-invoice-navy text-[11px]">
              <th className="border-r border-invoice-navy"></th>
              <th className="border-r border-invoice-navy"></th>
              <th className="border-r border-invoice-navy"></th>
              <th className="border-r border-invoice-navy"></th>
              <th className="border-r border-invoice-navy"></th>
              <th className="border-r border-invoice-navy w-[90px]">Rs.</th>
              <th className="border-r border-invoice-navy w-[40px]">Ps.</th>
              <th className="print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b border-invoice-navy/30 align-top h-[42px]"
              >
                <td className="border-r border-invoice-navy/30 text-center text-[13px] sm:text-sm py-1.5 text-invoice-navy/80">
                  {idx + 1}
                </td>
                <td className="border-r border-invoice-navy/30 relative">
                  <textarea
                    rows={1}
                    value={item.particulars}
                    onChange={(e) =>
                      onUpdate(item.id, "particulars", e.target.value)
                    }
                    placeholder="Item description"
                    className={cellInput + " resize-none leading-snug pr-7"}
                  />
                  <button
                    type="button"
                    onClick={() => startVoice(item.id, item.particulars)}
                    title="Speak item description"
                    data-html2canvas-ignore="true"
                    className="print:hidden absolute right-0.5 top-1/2 -translate-y-1/2 text-invoice-navy/60 hover:text-invoice-navy text-sm px-1"
                  >
                    🎤
                  </button>
                </td>
                <td className="border-r border-invoice-navy/30">
                  <input
                    value={item.hsn}
                    onChange={(e) => onUpdate(item.id, "hsn", e.target.value)}
                    placeholder="—"
                    className={cellInput + " text-center"}
                  />
                </td>
                <td className="border-r border-invoice-navy/30">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => onUpdate(item.id, "qty", e.target.value)}
                    placeholder="0"
                    className={cellInput + " text-center"}
                  />
                </td>
                <td className="border-r border-invoice-navy/30">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => onUpdate(item.id, "rate", e.target.value)}
                    placeholder="0"
                    className={cellInput + " text-right"}
                  />
                </td>
                <td className="border-r border-invoice-navy/30">
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) =>
                      onUpdate(item.id, "amount", e.target.value)
                    }
                    placeholder="0.00"
                    className={cellInput + " text-right"}
                  />
                </td>

                <td className="border-r border-invoice-navy/30 text-center text-invoice-navy/60">
                  00
                </td>
                <td
                  className="print:hidden text-center"
                  data-html2canvas-ignore="true"
                >
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemove(item.id)}
                      className="text-invoice-red/70 hover:text-invoice-red text-sm px-1"
                      title="Remove row"
                    >
                      ✕
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={onAdd}
        data-html2canvas-ignore="true"
        className="print:hidden w-full py-2 text-xs sm:text-sm font-semibold text-invoice-navy bg-invoice-navy/5 hover:bg-invoice-navy/10 border-t-2 border-invoice-navy transition"
      >
        + Add Item
      </button>
    </div>
  );
}
