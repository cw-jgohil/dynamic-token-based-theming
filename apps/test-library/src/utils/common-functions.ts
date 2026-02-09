export const allowOnlyNumberAndDot = (
  e: React.KeyboardEvent<HTMLInputElement>,
  currentValue: string,
) => {
  const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];

  if (allowedKeys.includes(e.key)) return;

  // Allow digits
  if (/[0-9]/.test(e.key)) return;

  // Allow only ONE dot
  if (e.key === "." && !currentValue.includes(".")) return;

  e.preventDefault();
};
