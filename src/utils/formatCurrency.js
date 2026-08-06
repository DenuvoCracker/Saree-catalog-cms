// Formats a number as Indian Rupees, e.g. 12500 -> "₹12,500"
export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
