
'use client'

import {  PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface HeaderPositionState {
    y: number
}

const initialState: HeaderPositionState = {
    y: 106
}

export const headerPositionState = createSlice({
    name: 'headerPositionState',
    initialState,
    reducers: {
        getYPostion: (state, action: PayloadAction<number> ) => {
            return {...state, y:action.payload}
        }
    }
})


export const {getYPostion} = headerPositionState.actions

export default headerPositionState.reducer