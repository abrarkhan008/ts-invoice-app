// import { useRef, useEffect, useState } from "react";

// export default function SignaturePad({ label, value, onChange }) {
//   const canvasRef = useRef(null);
//   const drawing = useRef(false);
//   const lastPos = useRef({ x: 0, y: 0 });
//   const [hasContent, setHasContent] = useState(!!value);

//   // Set up canvas resolution + restore saved signature
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ratio = window.devicePixelRatio || 1;
//     const rect = canvas.getBoundingClientRect();
//     canvas.width = rect.width * ratio;
//     canvas.height = rect.height * ratio;
//     const ctx = canvas.getContext("2d");
//     ctx.scale(ratio, ratio);
//     ctx.lineWidth = 2.2;
//     ctx.lineCap = "round";
//     ctx.lineJoin = "round";
//     ctx.strokeStyle = "#1a2f5c";

//     if (value) {
//       const img = new Image();
//       img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
//       img.src = value;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const getPos = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     if (e.touches && e.touches[0]) {
//       return {
//         x: e.touches[0].clientX - rect.left,
//         y: e.touches[0].clientY - rect.top,
//       };
//     }
//     return { x: e.clientX - rect.left, y: e.clientY - rect.top };
//   };

//   const start = (e) => {
//     e.preventDefault();
//     drawing.current = true;
//     lastPos.current = getPos(e);
//   };

//   const move = (e) => {
//     if (!drawing.current) return;
//     e.preventDefault();
//     const ctx = canvasRef.current.getContext("2d");
//     const pos = getPos(e);
//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.stroke();
//     lastPos.current = pos;
//     setHasContent(true);
//   };

//   const end = () => {
//     if (!drawing.current) return;
//     drawing.current = false;
//     onChange(canvasRef.current.toDataURL("image/png"));
//   };

//   const clear = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();
//     ctx.clearRect(0, 0, rect.width, rect.height);
//     setHasContent(false);
//     onChange("");
//   };

//   return (
//     <div className="w-full">
//       <div className="relative border-2 border-invoice-navy/40 rounded bg-white h-24 sm:h-28 touch-none">
//         <canvas
//           ref={canvasRef}
//           className="w-full h-full rounded cursor-crosshair touch-none"
//           onMouseDown={start}
//           onMouseMove={move}
//           onMouseUp={end}
//           onMouseLeave={end}
//           onTouchStart={start}
//           onTouchMove={move}
//           onTouchEnd={end}
//         />
//         {!hasContent && (
//           <span className="sig-placeholder absolute inset-0 flex items-center justify-center text-invoice-navy/30 text-xs sm:text-sm pointer-events-none select-none">
//             Draw signature here
//           </span>
//         )}
//         <button
//           type="button"
//           onClick={clear}
//           data-html2canvas-ignore="true"
//           className="absolute -top-2.5 -right-2.5 bg-invoice-red text-white text-[10px] leading-none rounded-full w-6 h-6 flex items-center justify-center shadow print:hidden"
//           title="Clear signature"
//         >
//           ✕
//         </button>
//       </div>
//       <p className="text-center text-[11px] sm:text-xs font-semibold text-invoice-navy mt-1">
//         {label}
//       </p>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";

export default function SignaturePad({ label, value, onChange }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [hasContent, setHasContent] = useState(!!value);

  // Set up canvas resolution + restore saved signature
  useEffect(() => {
    const canvas = canvasRef.current;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#1a2f5c";

    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e) => {
    e.preventDefault();
    drawing.current = true;
    lastPos.current = getPos(e);
  };

  const move = (e) => {
    if (!drawing.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    setHasContent(true);
  };

  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    onChange(canvasRef.current.toDataURL("image/png"));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasContent(false);
    onChange("");
  };

  return (
    <div className="w-full">
      <div className="relative border-2 border-invoice-navy/40 rounded bg-white h-24 sm:h-28 touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full rounded cursor-crosshair touch-none"
          onMouseDown={start}
          onMouseMove={move}
          onMouseUp={end}
          onMouseLeave={end}
          onTouchStart={start}
          onTouchMove={move}
          onTouchEnd={end}
        />
        {!hasContent && (
          <span className="sig-placeholder absolute inset-0 flex items-center justify-center text-invoice-navy/30 text-xs sm:text-sm pointer-events-none select-none">
            Draw signature here
          </span>
        )}
        <button
          type="button"
          onClick={clear}
          data-html2canvas-ignore="true"
          className="absolute -top-2.5 -right-2.5 bg-invoice-red text-white text-[10px] leading-none rounded-full w-6 h-6 flex items-center justify-center shadow print:hidden"
          title="Clear signature"
        >
          ✕
        </button>
      </div>
      <p className="text-center text-[11px] sm:text-xs font-semibold text-invoice-navy mt-1">
        {label}
      </p>
    </div>
  );
}
