import './App.css'

import ConfigSidebar from './ConfigSidebar';
import { useEffect, useState } from 'react';
import { useComponentProperties } from './utils/useComponentProperties';
import { ThemeTokens } from './utils/useCssConversion';
import { Button } from '@repo/ui';


const json: ThemeTokens = {
  "table": {
    "versions": {
      "version1": {
        "tokens": {
          "bg": {
            "value": "#f5f5f5",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          },
          "font-family": {
            "value": "Arial, sans-serif",
            "type": "input",
            "allow": true
          }
        }
      },
      "version2": {
        "tokens": {
          "bg": {
            "value": "#f5f5f5",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          },
          "font-family": {
            "value": "Arial, sans-serif",
            "type": "input",
            "allow": true
          }
        }
      }
    }
  },
  "btn": {
    "variants": {
      "primary": {
        "tokens": {
          "bg": {
            "value": "#144d8b",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          }
        }
      },
      "secondary": {
        "tokens": {
          "bg": {
            "value": "#6c757d",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          }
        }
      }
    }
  },
  "input": {
    "varients": {
      "default": {
        "tokens": {
          "bg": {
            "value": "#f5f5f5",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          }
        }
      },
      "icon-input": {
        "tokens": {
          "bg": {
            "value": "#f5f5f5",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          }
        }
      },
      "search-input": {
        "tokens": {
          "bg": {
            "value": "#f5f5f5",
            "type": "color",
            "allow": true
          },
          "text-color": {
            "value": "#333333",
            "type": "color",
            "allow": true
          },
          "border-color": {
            "value": "#cccccc",
            "type": "color",
            "allow": true
          },
          "font-size": {
            "value": "16px",
            "type": "input",
            "allow": true
          },
          "font-weight": {
            "value": "bold",
            "type": "select",
            "allow": true
          }
        }
      }
    }
  }
}

type ButtonVariant =
  | "link"
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger";

const buttonVariantMap: Partial<Record<string, ButtonVariant>> = {
  primary: "primary",
  secondary: "secondary",
  success: "success",
  danger: "danger",
  warning: "warning",
  info: "info",
};

function App() {
  const [themeJson, setThemeJson] = useState<ThemeTokens>(json);
  const [selectedComponent, setSelectedComponent] = useState("btn");
  const [selectedVersion, setSelectedVersion] = useState<string>();
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>();

  const componentData = useComponentProperties(
    themeJson,
    selectedComponent,
    selectedVersion,
    selectedVariant
  );

  console.log("componentData", componentData)
  console.log("selectedVariant", selectedVariant)

  const uiButtonVariant: ButtonVariant | undefined =
    selectedVariant
      ? buttonVariantMap[selectedVariant]
      : undefined;

  useEffect(() => {
    if (
      componentData.hasVersions &&
      (!selectedVersion ||
        !componentData.versions.includes(selectedVersion))
    ) {
      setSelectedVersion(componentData.versions[0]);
    }

    if (
      componentData.hasVariants &&
      (!selectedVariant ||
        !componentData.variants.includes(selectedVariant))
    ) {
      setSelectedVariant(componentData.variants[0]);
    }
  }, [selectedComponent, componentData.versions, componentData.variants]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* <List
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status", align: "center" },
        ]}
        data={[
          { name: "Alice", email: "alice@mail.com", status: "Active" },
          { name: "Bob", email: "bob@mail.com", status: "Inactive" },
        ]}
      /> */}
      <Button variant={uiButtonVariant}>Click me</Button>
      <ConfigSidebar
        themeJson={themeJson}
        selectedComponent={selectedComponent}
        selectedVersion={selectedVersion}
        selectedVariant={selectedVariant}
        componentData={componentData}
        setThemeJson={setThemeJson}
        setSelectedVersion={setSelectedVersion}
        setSelectedVariant={setSelectedVariant}
      />
    </div>
  )
}

export default App
