'use client'

import {  PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface MobileCategoryMenuState {
    isOpen: boolean
}

const initialState: MobileCategoryMenuState = {
    isOpen: false
}

export const mobileCategoryMenuSlice = createSlice({
    name: 'mobileCategoryMenu',
    initialState,
    reducers: {
        toogleMobileCategoryMenu: (state, action: PayloadAction<boolean> ) => {
            return {...state, isOpen:action.payload}
        }
    }
})


export const {toogleMobileCategoryMenu} = mobileCategoryMenuSlice.actions

export default mobileCategoryMenuSlice.reducer