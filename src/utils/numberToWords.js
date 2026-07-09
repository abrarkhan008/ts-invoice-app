// const ONES = [
//   "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
//   "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
//   "Seventeen", "Eighteen", "Nineteen",
// ];

// const TENS = [
//   "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
// ];

// function twoDigits(n) {
//   if (n < 20) return ONES[n];
//   const t = Math.floor(n / 10);
//   const o = n % 10;
//   return TENS[t] + (o ? " " + ONES[o] : "");
// }

// function threeDigits(n) {
//   const h = Math.floor(n / 100);
//   const rest = n % 100;
//   let str = "";
//   if (h) str += ONES[h] + " Hundred";
//   if (rest) str += (str ? " " : "") + twoDigits(rest);
//   return str;
// }

// /**
//  * Converts a number to words using the Indian numbering system
//  * (Crore, Lakh, Thousand, Hundred).
//  */
// export function numberToWordsIndian(num) {
//   num = Math.floor(Number(num) || 0);
//   if (num === 0) return "Zero";

//   const crore = Math.floor(num / 10000000);
//   num %= 10000000;
//   const lakh = Math.floor(num / 100000);
//   num %= 100000;
//   const thousand = Math.floor(num / 1000);
//   num %= 1000;
//   const hundred = num;

//   let parts = [];
//   if (crore) parts.push(threeDigits(crore) + " Crore");
//   if (lakh) parts.push(threeDigits(lakh) + " Lakh");
//   if (thousand) parts.push(threeDigits(thousand) + " Thousand");
//   if (hundred) parts.push(threeDigits(hundred));

//   return parts.join(" ").trim();
// }

// /**
//  * Converts a rupee amount (can include paise as decimals) into
//  * "Rupees ... Only" wording, Indian style.
//  */
// export function amountInWords(amount) {
//   const value = Math.abs(Number(amount) || 0);
//   const rupees = Math.floor(value);
//   const paise = Math.round((value - rupees) * 100);

//   let words = "Rupees " + numberToWordsIndian(rupees);
//   if (paise > 0) {
//     words += " and " + numberToWordsIndian(paise) + " Paise";
//   }
//   words += " Only";
//   return words;
// }
const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function twoDigits(n) {
  if (n < 20) return ONES[n];
  const t = Math.floor(n / 10);
  const o = n % 10;
  return TENS[t] + (o ? " " + ONES[o] : "");
}

function threeDigits(n) {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  let str = "";
  if (h) str += ONES[h] + " Hundred";
  if (rest) str += (str ? " " : "") + twoDigits(rest);
  return str;
}

// Converts an integer (rupees only) into words using the Indian numbering
// system: ... Crore, Lakh, Thousand, Hundred.
function integerToWordsIndian(num) {
  if (num === 0) return "Zero";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = num;

  const parts = [];
  if (crore) parts.push(threeDigits(crore) + " Crore");
  if (lakh) parts.push(threeDigits(lakh) + " Lakh");
  if (thousand) parts.push(threeDigits(thousand) + " Thousand");
  if (hundred) parts.push(threeDigits(hundred));

  return parts.join(" ");
}

// Converts a rupee amount (number, may include paise) into a bill-style
// words string, e.g. 69500 -> "Sixty Nine Thousand Five Hundred Only"
// and 1234.50 -> "One Thousand Two Hundred Thirty Four And Fifty Paise Only"
export function amountInWords(amount) {
  const value = Math.round((Number(amount) || 0) * 100) / 100;
  const rupees = Math.floor(value);
  const paise = Math.round((value - rupees) * 100);

  let words = integerToWordsIndian(rupees);

  if (paise > 0) {
    words += " And " + twoDigits(paise) + " Paise";
  }

  return words + " Only";
}
