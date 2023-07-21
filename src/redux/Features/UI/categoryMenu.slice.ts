'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CategoryMenuState {
  typeMenu: string | null,
  positionRender: number | null,
  payload: string
}

const initialState: CategoryMenuState = {
  typeMenu: null,
  positionRender:null,
  payload: ""
}

export const categoryMenuSlice = createSlice({
  name: 'categoryMenu',
  initialState,
  reducers: {
    toggleCategoryMenu: (state, action: PayloadAction<string | null>) => {
      return { ...state, typeMenu: action.payload }
    },
    getPositionRender: (state, action: PayloadAction<number | null>) => {
      return {...state, positionRender: action.payload,}
    },
  }
})

export const { toggleCategoryMenu, getPositionRender } = categoryMenuSlice.actions

export default categoryMenuSlice.reducer