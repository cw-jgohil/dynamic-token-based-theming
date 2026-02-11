import { ThemeTokens } from "../hooks/useCssConversion";

export const json: ThemeTokens = {
  table: {
    versions: {
      version1: {
        tokens: {
          // Typography
          "font-size": {
            value: "0.875rem",
            type: "input",
            allow: true,
          },
          "border-color": {
            value: "#ff0000",
            type: "color",
            allow: true,
          },
          "border-width": {
            value: "1px",
            type: "input",
            allow: true,
          },

          // Wrapper/Container
          radius: {
            value: "0.375rem",
            type: "input",
            allow: true,
          },

          // Table Header (head)
          "head-bg": {
            value: "#a9aaa8",
            type: "color",
            allow: true,
          },
          "head-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },
          "head-font-weight": {
            value: "normal",
            type: "select",
            allow: true,
          },
          "head-text-align": {
            value: "left",
            type: "select",
            allow: true,
          },

          // Table Header Cell (th)
          "cell-padding-x": {
            value: "0.75rem",
            type: "input",
            allow: true,
          },
          "cell-padding-y": {
            value: "0.5rem",
            type: "input",
            allow: true,
          },

          // Table Body (body)
          "body-bg": {
            value: "#ffffff",
            type: "color",
            allow: true,
          },
          "body-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },

          // Empty State
          "empty-color": {
            value: "#6c757d",
            type: "color",
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
              "font-weight": { value: "400", type: "select", allow: true },
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
              "font-weight": { value: "400", type: "select", allow: true },
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
  listview: {
    versions: {
      version1: {
        tokens: {
          /* Wrapper & table wrap (_listview.scss) */
          radius: {
            value: "0.375rem",
            type: "input",
            allow: true,
          },
          "border-width": {
            value: "1px",
            type: "input",
            allow: true,
          },
          "border-color": {
            value: "rgba(0, 0, 0, 0.125)",
            type: "color",
            allow: true,
          },
          "font-size": {
            value: "1rem",
            type: "input",
            allow: true,
          },
          /* Head / thead */
          "head-bg": {
            value: "#f8f9fa",
            type: "color",
            allow: true,
          },
          "head-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },
          "head-text-align": {
            value: "left",
            type: "select",
            allow: true,
          },
          "head-font-weight": {
            value: "400",
            type: "select",
            allow: true,
          },
          /* Cell padding */
          "cell-padding-x": {
            value: "0.75rem",
            type: "input",
            allow: true,
          },
          "cell-padding-y": {
            value: "0.5rem",
            type: "input",
            allow: true,
          },
          /* Body / tbody */
          "body-bg": {
            value: "#ffffff",
            type: "color",
            allow: true,
          },
          "body-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },
          /* Row hover */
          "item-hover-bg": {
            value: "#f8f9fa",
            type: "color",
            allow: true,
          },
          "item-hover-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },
          /* Empty state */
          "empty-color": {
            value: "#6c757d",
            type: "color",
            allow: true,
          },
          "empty-font-size": {
            value: "1rem",
            type: "input",
            allow: true,
          },
          /* Search (themeable from listview) */
          "search-bg": {
            value: "#ffffff",
            type: "color",
            allow: true,
          },
          "search-color": {
            value: "#212529",
            type: "color",
            allow: true,
          },
          "search-border-color": {
            value: "rgba(0, 0, 0, 0.125)",
            type: "color",
            allow: true,
          },
          "search-font-size": {
            value: "1rem",
            type: "input",
            allow: true,
          },
          "search-placeholder-color": {
            value: "#6c757d",
            type: "color",
            allow: true,
          },
          /* Pagination (themeable from listview) */
          "pagination-color": {
            value: "#144d8b",
            type: "color",
            allow: true,
          },
          "pagination-active-bg": {
            value: "#144d8b",
            type: "color",
            allow: true,
          },
          "pagination-active-border-color": {
            value: "#144d8b",
            type: "color",
            allow: true,
          },
          "pagination-active-color": {
            value: "#ffffff",
            type: "color",
            allow: true,
          },
        },
      },
    },
  },
  input: {
    versions: {
      version1: {
        tokens: {
          "padding-x": { value: "1rem", type: "input", allow: true },
          "padding-y": { value: "0.5rem", type: "input", allow: true },
          "font-size": { value: "1rem", type: "input", allow: true },
          color: { value: "#212529", type: "color", allow: true },
          bg: { value: "#ffffff", type: "color", allow: true },
          "border-width": { value: "1px", type: "input", allow: true },
          "border-color": { value: "rgba(0, 0, 0, 0.125)", type: "color", allow: true },
          radius: { value: "0.375rem", type: "input", allow: true },
          "placeholder-color": { value: "#6c757d", type: "color", allow: true },
          "focus-color": { value: "#212529", type: "color", allow: true },
          "focus-bg": { value: "#ffffff", type: "color", allow: true },
          "focus-border-color": { value: "#144d8b", type: "color", allow: true },
          "disabled-color": { value: "#6c757d", type: "color", allow: true },
          "disabled-bg": { value: "#e9ecef", type: "color", allow: true },
          "disabled-border-color": { value: "rgba(0, 0, 0, 0.125)", type: "color", allow: true },
          "error-color": { value: "#dc3545", type: "color", allow: true },
          "icon-size": { value: "1rem", type: "input", allow: true },
          "icon-color": { value: "#144d8b", type: "color", allow: true },
          "icon-gap": { value: "0.5rem", type: "input", allow: true },
        },
      },
    },
  },
  pagination: {
    versions: {
      version1: {
        tokens: {
          "padding-x": { value: "0.5rem", type: "input", allow: true },
          "padding-y": { value: "0.375rem", type: "input", allow: true },
          "font-size": { value: "1rem", type: "input", allow: true },
          color: { value: "#144d8b", type: "color", allow: true },
          bg: { value: "#ffffff", type: "color", allow: true },
          "border-width": { value: "1px", type: "input", allow: true },
          "border-color": { value: "rgba(0, 0, 0, 0.125)", type: "color", allow: true },
          "border-radius": { value: "0.375rem", type: "input", allow: true },
          "hover-color": { value: "#0d305c", type: "color", allow: true },
          "hover-bg": { value: "#e9ecef", type: "color", allow: true },
          "hover-border-color": { value: "rgba(0, 0, 0, 0.125)", type: "color", allow: true },
          "focus-color": { value: "#0d305c", type: "color", allow: true },
          "focus-bg": { value: "#e9ecef", type: "color", allow: true },
          "active-color": { value: "#ffffff", type: "color", allow: true },
          "active-bg": { value: "#144d8b", type: "color", allow: true },
          "active-border-color": { value: "#144d8b", type: "color", allow: true },
          "disabled-color": { value: "#6c757d", type: "color", allow: true },
          "disabled-bg": { value: "#ffffff", type: "color", allow: true },
          "disabled-border-color": { value: "rgba(0, 0, 0, 0.125)", type: "color", allow: true },
        },
      },
    },
  },
  badge: {
    versions: {
      version1: {
        variants: {
          primary: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#144d8b", type: "color", allow: true },
            },
          },
          secondary: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#6c757d", type: "color", allow: true },
            },
          },
          success: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#198754", type: "color", allow: true },
            },
          },
          danger: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#dc3545", type: "color", allow: true },
            },
          },
          warning: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#000000", type: "color", allow: true },
              bg: { value: "#ffc107", type: "color", allow: true },
            },
          },
          info: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#000000", type: "color", allow: true },
              bg: { value: "#0dcaf0", type: "color", allow: true },
            },
          },
          light: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#212529", type: "color", allow: true },
              bg: { value: "#f8f9fa", type: "color", allow: true },
            },
          },
          dark: {
            tokens: {
              "padding-x": { value: "0.5rem", type: "input", allow: true },
              "padding-y": { value: "0.25rem", type: "input", allow: true },
              "font-size": { value: "0.75rem", type: "input", allow: true },
              "font-weight": { value: "500", type: "select", allow: true },
              "border-radius": { value: "10rem", type: "input", allow: true },
              color: { value: "#ffffff", type: "color", allow: true },
              bg: { value: "#212529", type: "color", allow: true },
            },
          },
        },
      },
    },
  },
  checkbox: {
    tokens: {
      width: { value: "1.125rem", type: "input", allow: true },
      height: { value: "1.125rem", type: "input", allow: true },
      bg: { value: "#ffffff", type: "color", allow: true },
      border: {
        value: "1px solid #144d8b",
        type: "input",
        allow: true,
      },
      "checked-bg": { value: "#144d8b", type: "color", allow: true },
      "checked-border-color": {
        value: "#144d8b",
        type: "color",
        allow: true,
      },
      "focus-border-color": {
        value: "#144d8b",
        type: "color",
        allow: true,
      },
      "label-color": { value: "#212529", type: "color", allow: true },
    },
  },
  select: {
    tokens: {
      padding: { value: "0.5rem 1rem", type: "input", allow: true },
      "font-size": { value: "1rem", type: "input", allow: true },
      color: { value: "#212529", type: "color", allow: true },
      bg: { value: "#ffffff", type: "color", allow: true },
      border: {
        value: "1px solid rgba(0, 0, 0, 0.125)",
        type: "input",
        allow: true,
      },
      radius: { value: "0.375rem", type: "input", allow: true },
      "error-color": { value: "#dc3545", type: "color", allow: true },
    },
  },
};
