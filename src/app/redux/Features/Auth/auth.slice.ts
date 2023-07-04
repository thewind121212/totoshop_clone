'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface RegisterState {
    isLogin: boolean,
    isSentEmailRegister: boolean
    userEmail: string
}

const initialState: RegisterState = {
    isLogin: false,
    isSentEmailRegister: false,
    userEmail: ''
}

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setLoginStatus: (state, action: PayloadAction<boolean>) => {
            return { ...state, isLogin: action.payload }
        },
        setSentEmailRegisterStatus: (state, action: PayloadAction<boolean>) => {
            return { ...state, isSentEmailRegister: action.payload }
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            return  {...state, userEmail: action.payload}
        }
    }
})

export const { setLoginStatus, setSentEmailRegisterStatus, setUserEmail } = registerSlice.actions

export default registerSlice.reducer