import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Component {
  name: string;
  "component-key": string;
  id: string | number;
}

export interface ComponentState {
  selectedComponents: Component | undefined;
  selectedVersion: string | undefined;
  selectedVariant: string | undefined;
}

const initialState: ComponentState = {
  selectedComponents: undefined,
  selectedVersion: undefined,
  selectedVariant: undefined,
};

export const componentSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    setSelectedComponents: (state, action: PayloadAction<Component>) => {
      state.selectedComponents = action.payload;
    },
    resetSelectedComponents: (state) => {
      state.selectedComponents = undefined;
    },
    setSelectedVersion: (state, action: PayloadAction<string>) => {
      state.selectedVersion = action.payload;
    },
    resetSelectedVersion: (state) => {
      state.selectedVersion = undefined;
    },
    setSelectedVariant: (state, action: PayloadAction<string>) => {
      state.selectedVariant = action.payload;
    },
    resetSelectedVariant: (state) => {
      state.selectedVariant = undefined;
    },
  },
});

export const {
  setSelectedComponents,
  resetSelectedComponents,
  setSelectedVersion,
  resetSelectedVersion,
  setSelectedVariant,
  resetSelectedVariant,
} = componentSlice.actions;

export default componentSlice.reducer;
