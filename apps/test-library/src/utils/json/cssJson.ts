import { ThemeTokens } from "../hooks/useCssConversion";

export const json: ThemeTokens = {
  table: {
    versions: {
      version1: {
        tokens: {
          bg: {
            value: "#f5f5f5",
            type: "color",
            allow: true,
          },
          "text-color": {
            value: "#333333",
            type: "color",
            allow: true,
          },
          "border-color": {
            value: "#cccccc",
            type: "color",
            allow: true,
          },
          "font-size": {
            value: "16px",
            type: "input",
            allow: true,
          },
          "font-weight": {
            value: "bold",
            type: "select",
            allow: true,
          },
          "font-family": {
            value: "Arial, sans-serif",
            type: "input",
            allow: true,
          },
        },
      },
      version2: {
        tokens: {
          bg: {
            value: "#f5f5f5",
            type: "color",
            allow: true,
          },
          "text-color": {
            value: "#333333",
            type: "color",
            allow: true,
          },
          "border-color": {
            value: "#cccccc",
            type: "color",
            allow: true,
          },
          "font-size": {
            value: "16px",
            type: "input",
            allow: true,
          },
          "font-weight": {
            value: "bold",
            type: "select",
            allow: true,
          },
          "font-family": {
            value: "Arial, sans-serif",
            type: "input",
            allow: true,
          },
        },
      },
    },
  },
  btn: {
    versions: {
      version1: {
        variants: {
          primary: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#144d8b", type: "color", allow: true },
              "border-color": { value: "#144d8b", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#0d305c", type: "color", allow: true },
              "hover-border-color": {
                value: "#0d305c",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#0d305c", type: "color", allow: true },
              "active-border-color": {
                value: "#0d305c",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#144d8b", type: "color", allow: true },
              "disabled-border-color": {
                value: "#144d8b",
                type: "color",
                allow: true,
              },
            },
          },

          secondary: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#6c757d", type: "color", allow: true },
              "border-color": { value: "#6c757d", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#5c636a", type: "color", allow: true },
              "hover-border-color": {
                value: "#5c636a",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#5c636a", type: "color", allow: true },
              "active-border-color": {
                value: "#5c636a",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#6c757d", type: "color", allow: true },
              "disabled-border-color": {
                value: "#6c757d",
                type: "color",
                allow: true,
              },
            },
          },

          success: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#198754", type: "color", allow: true },
              "border-color": { value: "#198754", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#157347", type: "color", allow: true },
              "hover-border-color": {
                value: "#157347",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#157347", type: "color", allow: true },
              "active-border-color": {
                value: "#157347",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#198754", type: "color", allow: true },
              "disabled-border-color": {
                value: "#198754",
                type: "color",
                allow: true,
              },
            },
          },

          danger: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#dc3545", type: "color", allow: true },
              "border-color": { value: "#dc3545", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#bb2d3b", type: "color", allow: true },
              "hover-border-color": {
                value: "#bb2d3b",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#bb2d3b", type: "color", allow: true },
              "active-border-color": {
                value: "#bb2d3b",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#dc3545", type: "color", allow: true },
              "disabled-border-color": {
                value: "#dc3545",
                type: "color",
                allow: true,
              },
            },
          },

          warning: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#ffc107", type: "color", allow: true },
              "border-color": { value: "#ffc107", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#ffca2c", type: "color", allow: true },
              "hover-border-color": {
                value: "#ffca2c",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#ffca2c", type: "color", allow: true },
              "active-border-color": {
                value: "#ffca2c",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#ffc107", type: "color", allow: true },
              "disabled-border-color": {
                value: "#ffc107",
                type: "color",
                allow: true,
              },
            },
          },

          info: {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#0dcaf0", type: "color", allow: true },
              "border-color": { value: "#0dcaf0", type: "color", allow: true },

              "hover-color": { value: "#ffffff", type: "color", allow: true },
              "hover-bg": { value: "#31d2f2", type: "color", allow: true },
              "hover-border-color": {
                value: "#31d2f2",
                type: "color",
                allow: true,
              },

              "active-color": { value: "#ffffff", type: "color", allow: true },
              "active-bg": { value: "#31d2f2", type: "color", allow: true },
              "active-border-color": {
                value: "#31d2f2",
                type: "color",
                allow: true,
              },

              "disabled-color": {
                value: "#ffffff",
                type: "color",
                allow: true,
              },
              "disabled-bg": { value: "#0dcaf0", type: "color", allow: true },
              "disabled-border-color": {
                value: "#0dcaf0",
                type: "color",
                allow: true,
              },
            },
          },

          "outline-primary": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#144d8b", type: "color", allow: true },
              "border-color": { value: "#144d8b", type: "color", allow: true },
              "hover-bg": { value: "#144d8b", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },

          "outline-secondary": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#6c757d", type: "color", allow: true },
              "border-color": { value: "#6c757d", type: "color", allow: true },
              "hover-bg": { value: "#6c757d", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },

          "outline-success": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#198754", type: "color", allow: true },
              "border-color": { value: "#198754", type: "color", allow: true },
              "hover-bg": { value: "#198754", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },

          "outline-danger": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#dc3545", type: "color", allow: true },
              "border-color": { value: "#dc3545", type: "color", allow: true },
              "hover-bg": { value: "#dc3545", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },

          "outline-warning": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#ffc107", type: "color", allow: true },
              "border-color": { value: "#ffc107", type: "color", allow: true },
              "hover-bg": { value: "#ffc107", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },

          "outline-info": {
            tokens: {
              "padding-x": { value: "1rem", type: "input", allow: true },
              "padding-y": { value: "0.5rem", type: "input", allow: true },
              "font-size": { value: "1rem", type: "input", allow: true },
              "font-weight": { value: "400", type: "input", allow: true },
              "border-radius": {
                value: "0.375rem",
                type: "input",
                allow: true,
              },
              "line-height": { value: "1.5", type: "input", allow: true },
              "border-width": { value: "1px", type: "input", allow: true },
              "letter-spacing": { value: "normal", type: "input", allow: true },

              color: { value: "#0dcaf0", type: "color", allow: true },
              "border-color": { value: "#0dcaf0", type: "color", allow: true },
              "hover-bg": { value: "#0dcaf0", type: "color", allow: true },
              "hover-color": { value: "#ffffff", type: "color", allow: true },
            },
          },
        },
      },
    },
  },
};
