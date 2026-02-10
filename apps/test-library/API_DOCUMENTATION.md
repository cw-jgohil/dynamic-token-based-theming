# API Integration Documentation

This document describes the API integrations and CRUD operations available in the application.

## Base URLs

- **Components API**: `https://6985a5b26964f10bf253f2e3.mockapi.io/components`
- **Themes API**: `https://6985a5b26964f10bf253f2e3.mockapi.io/themes`

## Components API

### Data Structure
```typescript
interface ComponentMeta {
  id: string;
  name: string;
  "component-key": string;
}
```

### Available Hooks

#### `useComponents()`
Fetches all components from the API.

```typescript
import { useComponents } from "./api/components";

const { data, isLoading, error } = useComponents();
// data: ComponentMeta[]
```

**Usage Example:**
```typescript
const { data: components, isLoading } = useComponents();

if (isLoading) return <div>Loading...</div>;

return (
  <ul>
    {components?.map((component) => (
      <li key={component.id}>{component.name}</li>
    ))}
  </ul>
);
```

---

## Themes API

### Data Structure
```typescript
interface Theme {
  id: string;
  "theme-name": string;
  "theme-json": ThemeTokens;
  "design-tokens-json": Record<string, any>;
}

interface CreateThemeDto {
  "theme-name": string;
  "theme-json": ThemeTokens;
  "design-tokens-json"?: Record<string, any>;
}

interface UpdateThemeDto {
  "theme-name"?: string;
  "theme-json"?: ThemeTokens;
  "design-tokens-json"?: Record<string, any>;
}
```

### Available Hooks

#### 1. `useThemes()` - GET All Themes
Fetches all themes from the API.

```typescript
import { useThemes } from "./api/themes";

const { data, isLoading, error } = useThemes();
// data: Theme[]
```

**Usage Example:**
```typescript
const { data: themes, isLoading } = useThemes();

return (
  <select>
    {themes?.map((theme) => (
      <option key={theme.id} value={theme.id}>
        {theme["theme-name"]}
      </option>
    ))}
  </select>
);
```

---

#### 2. `useTheme(id)` - GET Single Theme
Fetches a single theme by ID.

```typescript
import { useTheme } from "./api/themes";

const { data, isLoading, error } = useTheme(themeId);
// data: Theme
```

**Usage Example:**
```typescript
const themeId = "1";
const { data: theme, isLoading } = useTheme(themeId);

if (isLoading) return <div>Loading theme...</div>;

return <div>Current Theme: {theme?.["theme-name"]}</div>;
```

---

#### 3. `useCreateTheme()` - POST Create New Theme
Creates a new theme.

```typescript
import { useCreateTheme } from "./api/themes";

const createTheme = useCreateTheme();
```

**Usage Example:**
```typescript
const createTheme = useCreateTheme();

const handleCreate = async () => {
  try {
    await createTheme.mutateAsync({
      "theme-name": "My New Theme",
      "theme-json": {
        btn: { /* theme tokens */ },
        table: { /* theme tokens */ }
      },
      "design-tokens-json": {}
    });
    alert("Theme created successfully!");
  } catch (error) {
    console.error("Failed to create theme:", error);
  }
};

return (
  <button
    onClick={handleCreate}
    disabled={createTheme.isPending}
  >
    {createTheme.isPending ? "Creating..." : "Create Theme"}
  </button>
);
```

---

#### 4. `useUpdateTheme()` - PUT Update Theme
Updates an existing theme.

```typescript
import { useUpdateTheme } from "./api/themes";

const updateTheme = useUpdateTheme();
```

**Usage Example:**
```typescript
const updateTheme = useUpdateTheme();

const handleUpdate = async () => {
  try {
    await updateTheme.mutateAsync({
      id: "1",
      data: {
        "theme-name": "Updated Theme Name",
        "theme-json": updatedThemeJson
      }
    });
    alert("Theme updated successfully!");
  } catch (error) {
    console.error("Failed to update theme:", error);
  }
};

return (
  <button
    onClick={handleUpdate}
    disabled={updateTheme.isPending}
  >
    {updateTheme.isPending ? "Saving..." : "Save Theme"}
  </button>
);
```

---

#### 5. `useDeleteTheme()` - DELETE Theme
Deletes a theme.

```typescript
import { useDeleteTheme } from "./api/themes";

const deleteTheme = useDeleteTheme();
```

**Usage Example:**
```typescript
const deleteTheme = useDeleteTheme();

const handleDelete = async (themeId: string) => {
  if (!confirm("Are you sure you want to delete this theme?")) return;

  try {
    await deleteTheme.mutateAsync(themeId);
    alert("Theme deleted successfully!");
  } catch (error) {
    console.error("Failed to delete theme:", error);
  }
};

return (
  <button
    onClick={() => handleDelete("1")}
    disabled={deleteTheme.isPending}
  >
    {deleteTheme.isPending ? "Deleting..." : "Delete Theme"}
  </button>
);
```

---

## Theme Context

### Global Theme Management

The application uses a React Context to manage the current theme globally.

```typescript
import { useThemeContext } from "./context/ThemeContext";

const {
  currentTheme,      // Current selected theme
  themeJson,         // Current theme JSON
  setCurrentTheme,   // Set the current theme
  setThemeJson,      // Set theme JSON
  updateThemeJson    // Update theme JSON
} = useThemeContext();
```

**Usage Example - Theme Switching:**
```typescript
const { currentTheme, setCurrentTheme } = useThemeContext();
const { data: themes } = useThemes();

const handleThemeChange = (themeId: string) => {
  const selected = themes?.find(t => t.id === themeId);
  if (selected) {
    setCurrentTheme(selected);
    // Theme JSON is automatically updated
  }
};

return (
  <select value={currentTheme?.id} onChange={(e) => handleThemeChange(e.target.value)}>
    {themes?.map(theme => (
      <option key={theme.id} value={theme.id}>
        {theme["theme-name"]}
      </option>
    ))}
  </select>
);
```

---

## Complete CRUD Example

Here's a complete example component with all CRUD operations:

```typescript
import { useState } from "react";
import {
  useThemes,
  useCreateTheme,
  useUpdateTheme,
  useDeleteTheme
} from "./api/themes";
import { useThemeContext } from "./context/ThemeContext";

function ThemeManager() {
  const { data: themes, isLoading } = useThemes();
  const createTheme = useCreateTheme();
  const updateTheme = useUpdateTheme();
  const deleteTheme = useDeleteTheme();
  const { currentTheme, setCurrentTheme, themeJson } = useThemeContext();

  const [newThemeName, setNewThemeName] = useState("");

  // CREATE
  const handleCreate = async () => {
    await createTheme.mutateAsync({
      "theme-name": newThemeName,
      "theme-json": themeJson,
      "design-tokens-json": {}
    });
    setNewThemeName("");
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!currentTheme) return;

    await updateTheme.mutateAsync({
      id: currentTheme.id,
      data: { "theme-json": themeJson }
    });
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (confirm("Delete this theme?")) {
      await deleteTheme.mutateAsync(id);
    }
  };

  // SELECT/READ
  const handleSelect = (id: string) => {
    const theme = themes?.find(t => t.id === id);
    if (theme) setCurrentTheme(theme);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* CREATE */}
      <input
        value={newThemeName}
        onChange={(e) => setNewThemeName(e.target.value)}
        placeholder="New theme name"
      />
      <button onClick={handleCreate}>Create Theme</button>

      {/* READ & SELECT */}
      <select value={currentTheme?.id} onChange={(e) => handleSelect(e.target.value)}>
        {themes?.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme["theme-name"]}
          </option>
        ))}
      </select>

      {/* UPDATE */}
      <button onClick={handleUpdate}>Save Changes</button>

      {/* DELETE */}
      {currentTheme && (
        <button onClick={() => handleDelete(currentTheme.id)}>
          Delete Current Theme
        </button>
      )}
    </div>
  );
}
```

---

## Current Implementation

### Home Page
- ✅ Fetches and displays all components
- ✅ Fetches and displays all themes
- ✅ Theme switching functionality
- ✅ Shows component variants from theme JSON

### CSS Builder Page
- ✅ Uses global theme context
- ✅ Real-time theme editing
- ✅ Save theme changes to API (PUT request)
- ✅ Reset to default theme

### Key Features
1. **Global Theme State**: Theme is shared across all pages via Context
2. **Real-time Updates**: Changes are automatically reflected across the app
3. **API Persistence**: Themes are saved to MockAPI
4. **Optimistic Updates**: UI updates immediately, syncs with API in background

---

## MockAPI.io Information

MockAPI automatically provides:
- RESTful endpoints (GET, POST, PUT, DELETE)
- Automatic ID generation
- Data persistence
- CORS support

For more information, visit: https://mockapi.io/docs
