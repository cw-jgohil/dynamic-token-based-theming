# Dynamic Theme System - Complete Guide

## 🎨 How It Works

The theme system converts JSON theme data from the API into CSS variables that style your components dynamically.

### Architecture Flow

```
API Theme JSON → Context → CSS Generator → CSS Variables → Component Styles
```

## 📁 File Structure

```
src/
├── api/
│   ├── themes.ts                    # Theme API CRUD operations
│   └── types.ts                     # Theme TypeScript interfaces
├── context/
│   └── ThemeContext.tsx             # Global theme state management
├── utils/
│   ├── hooks/
│   │   └── useCssConversion.ts      # JSON to CSS conversion
│   └── validateTheme.ts             # Theme validation utilities
└── pages/
    └── Home/
        └── Home.tsx                 # Shows all variants dynamically

packages/ui/src/components/Button/
├── Button.tsx                       # Button component
└── Button.css                       # CSS variables styling
```

## 🔄 Theme Structure (From API)

### Example Theme JSON

```json
{
  "id": "1",
  "theme-name": "Azavista Theme",
  "theme-json": {
    "btn": {
      "versions": {
        "version1": {
          "variants": {
            "primary": {
              "tokens": {
                "color": { "value": "#ffffff", "type": "color", "allow": true },
                "bg": { "value": "#144d8b", "type": "color", "allow": true },
                "border-color": { "value": "#144d8b", "type": "color", "allow": true },
                "padding-x": { "value": "1rem", "type": "input", "allow": true },
                "padding-y": { "value": "0.5rem", "type": "input", "allow": true },
                "font-size": { "value": "1rem", "type": "input", "allow": true },
                "border-radius": { "value": "0.375rem", "type": "input", "allow": true },
                "hover-color": { "value": "#ffffff", "type": "color", "allow": true },
                "hover-bg": { "value": "#0d305c", "type": "color", "allow": true }
              }
            },
            "secondary": { /* similar structure */ },
            "success": { /* similar structure */ },
            "danger": { /* similar structure */ }
          }
        }
      }
    },
    "table": {
      "versions": {
        "version1": {
          "tokens": { /* table-specific tokens */ }
        }
      }
    },
    "listview": {
      "variants": {
        "default": { "tokens": { /* tokens */ } },
        "compact": { "tokens": { /* tokens */ } }
      }
    }
  }
}
```

## 🎯 Generated CSS Variables

### For Button Primary Variant

The theme JSON above generates these CSS variables:

```css
:root {
  --azv-btn-primary-color: #ffffff;
  --azv-btn-primary-bg: #144d8b;
  --azv-btn-primary-border-color: #144d8b;
  --azv-btn-primary-padding-x: 1rem;
  --azv-btn-primary-padding-y: 0.5rem;
  --azv-btn-primary-font-size: 1rem;
  --azv-btn-primary-border-radius: 0.375rem;
  --azv-btn-primary-hover-color: #ffffff;
  --azv-btn-primary-hover-bg: #0d305c;
  /* ... more variants */
}
```

### Naming Convention

```
--azv-{component}-{variant}-{property}
```

Examples:
- `--azv-btn-primary-color`
- `--azv-btn-secondary-bg`
- `--azv-btn-success-hover-bg`
- `--azv-table-border-color`
- `--azv-listview-default-bg`

## 💅 Component Styling

### Button.css Usage

```css
.azv-btn-primary {
  color: var(--azv-btn-primary-color, #fff);
  background-color: var(--azv-btn-primary-bg, #0d6efd);
  border-color: var(--azv-btn-primary-border-color, #0d6efd);
  padding: var(--azv-btn-primary-padding-y, 0.5rem) var(--azv-btn-primary-padding-x, 1rem);
  font-size: var(--azv-btn-primary-font-size, 1rem);
  border-radius: var(--azv-btn-primary-border-radius, 0.375rem);
}

.azv-btn-primary:hover {
  color: var(--azv-btn-primary-hover-color, #fff);
  background-color: var(--azv-btn-primary-hover-bg, #0b5ed7);
  border-color: var(--azv-btn-primary-hover-border-color, #0a58ca);
}
```

## 🔧 How to Use

### 1. Theme Switching (Home Page)

```tsx
// Automatically loads themes from API
const { data: themes } = useThemes();

// Global theme context
const { setCurrentTheme } = useThemeContext();

// Switch theme
const handleThemeChange = (themeId: string) => {
  const theme = themes?.find(t => t.id === themeId);
  if (theme) {
    setCurrentTheme(theme); // Automatically generates CSS
  }
};
```

### 2. Using Components with Themes

```tsx
import { Button } from "@repo/ui";

// All variants automatically styled from theme
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="success">Success Button</Button>
```

### 3. Dynamic Variant Display (Home Page)

```tsx
// Get all variants from theme
const variants = getComponentVariants("btn");
// ["primary", "secondary", "success", "danger", "warning", "info"]

// Render all variants dynamically
{variants.map((variant) => (
  <Button key={variant} variant={variant}>
    {variant} Button
  </Button>
))}
```

## 🎨 Supported Components

### Buttons (btn)
- **Structure**: `versions.version1.variants`
- **Variants**: primary, secondary, success, danger, warning, info, outline-primary, outline-secondary, etc.
- **CSS Class**: `.azv-btn-{variant}`

### Tables (table)
- **Structure**: `versions.version1.tokens`
- **No variants**: Direct tokens
- **CSS Class**: `.azv-table`

### ListView (listview)
- **Structure**: `variants`
- **Variants**: default, compact, striped, bordered
- **CSS Class**: `.azv-listview-{variant}`

### Input (input)
- **Structure**: `varients` (typo in API)
- **Variants**: default, icon-input, search-input
- **CSS Class**: `.azv-input-{variant}`

## 🔄 Theme Update Flow

```
1. User selects theme dropdown
   ↓
2. setCurrentTheme(theme)
   ↓
3. ThemeContext detects change
   ↓
4. Validates theme structure
   ↓
5. Updates themeJson state
   ↓
6. useCssConversion.convertAndInject()
   ↓
7. Generates CSS variables
   ↓
8. Injects <style id="azv-global-theme">
   ↓
9. Components re-render with new styles
```

## 🐛 Debugging

### Check Console Logs

When switching themes, you'll see:
```
Loading theme: Azavista Theme
Theme JSON Structure
Generating CSS for theme with components: ["table", "btn", "listview", "input"]
Generated 180 CSS variables
```

### Inspect Generated CSS

Open DevTools → Elements → `<head>` → Find:
```html
<style id="azv-global-theme">
  :root {
    --azv-btn-primary-color: #ffffff;
    --azv-btn-primary-bg: #144d8b;
    /* ... all variables */
  }
</style>
```

### Check Applied Styles

Inspect a button → Computed tab → Search for `--azv-btn`

## 🎯 Key Features

✅ **Automatic CSS Generation** - JSON → CSS variables
✅ **Real-time Updates** - Instant theme switching
✅ **Type Safety** - Full TypeScript support
✅ **Validation** - Theme structure validation
✅ **Fallbacks** - Default values if theme fails
✅ **Dynamic Variants** - Shows all available variants
✅ **Persistent Storage** - Themes saved to MockAPI

## 📝 Adding New Components

### 1. Add to API Theme JSON

```json
{
  "my-component": {
    "variants": {
      "default": {
        "tokens": {
          "bg": { "value": "#fff", "type": "color", "allow": true },
          "color": { "value": "#000", "type": "color", "allow": true }
        }
      }
    }
  }
}
```

### 2. Create Component CSS

```css
/* MyComponent.css */
.azv-my-component-default {
  background-color: var(--azv-my-component-default-bg, #fff);
  color: var(--azv-my-component-default-color, #000);
}
```

### 3. Use in Component

```tsx
import "./MyComponent.css";

const MyComponent = ({ variant = "default" }) => (
  <div className={`azv-my-component-${variant}`}>
    Content
  </div>
);
```

## 🚀 Performance

- **CSS Variables**: Native browser feature, extremely fast
- **Single Style Tag**: All theme CSS in one `<style>` element
- **No Runtime CSS-in-JS**: Pre-generated CSS variables
- **Lazy Loading**: Routes lazy load for better performance

## 📚 References

- Theme API: `https://6985a5b26964f10bf253f2e3.mockapi.io/themes`
- Components API: `https://6985a5b26964f10bf253f2e3.mockapi.io/components`
- CSS Variables Docs: [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
