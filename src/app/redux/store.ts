'use client'

import { configureStore } from '@reduxjs/toolkit'
//UI Global State
import mobileCategoryMenuSlice from './Features/UI/mobileCategoryMenu.slice'
import desktopCategoryMenuSlice from './Features/UI/desktopCategoryMenu.slice'
import headerPositionSlice from './Features/UI/headerPosition.slice'
import snackBarSlice from './Features/UI/snackBar.slice'
//Auth Global State
import registerSlice from './Features/Auth/auth.slice'


export const store = configureStore({
  reducer: {
    mobileCategoryMenuStatus: mobileCategoryMenuSlice,
    desktopCategoryMenuStatus: desktopCategoryMenuSlice ,
    headerPositionStatus: headerPositionSlice,
    snackBarStatus: snackBarSlice,
    registerStatus: registerSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
