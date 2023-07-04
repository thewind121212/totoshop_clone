
'use client'

import {  PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface DesktopCategoryMenuState {
    isOpen: boolean
}

const initialState: DesktopCategoryMenuState = {
    isOpen: false
}

export const desktopCategoryMenuSlice = createSlice({
    name: 'desktopCategoryMenu',
    initialState,
    reducers: {
        toogleDesktopCategoryMenu: (state, action: PayloadAction<boolean> ) => {
            return {...state, isOpen:action.payload}
        }
    }
})


export const {toogleDesktopCategoryMenu} = desktopCategoryMenuSlice.actions

export default desktopCategoryMenuSlice.reducer