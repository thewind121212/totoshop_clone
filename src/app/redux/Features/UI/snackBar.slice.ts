"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SnackBarState {
  show: boolean;
  notificationStack: any[]
}

const initialState: SnackBarState = {
  show: false,
  notificationStack: []
};

export const snackBarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    toogleSnackBar: (state, action: PayloadAction<SnackBarState>) => {
      return {
        ...state,
        show: action.payload.show,
        notificationStack: action.payload.notificationStack
      };
    },
  },
});

export const { toogleSnackBar } = snackBarSlice.actions;

export default snackBarSlice.reducer;
