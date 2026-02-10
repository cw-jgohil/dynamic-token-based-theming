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

export const getSelectOptions = (name: string) => {
  if (name.includes("border-style")) {
    return [
      "solid",
      "dashed",
      "dotted",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
    ];
  } else if (name.includes("text-align")) {
    return ["left", "center", "right"];
  } else if (name.includes("font-weight")) {
    return [
      "normal",
      "bold",
      "bolder",
      "lighter",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
    ];
  }
  return [];
};
