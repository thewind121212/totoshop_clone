'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    filterSliderOpen: boolean;
    filterActive: boolean;
    subCategory: string[];
    colorAttribute: string[];
    sizeAttribute: string[];
    priceAttribute: string;
}

const initialState: FilterState = {
    filterSliderOpen: false,
    filterActive: false,
    subCategory: [],
    colorAttribute: [],
    sizeAttribute: [],
    priceAttribute: '0',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeFilterSubCategory: (state, action: PayloadAction<string[]>) => {
            const newState = { ...state, subCategory: action.payload }
            const isActive = checkingFilter(newState)
            return state = { ...newState, filterActive: isActive }
        },
        changeFilterColorAttribute: (state, action: PayloadAction<string[]>) => {
            const newState = { ...state, colorAttribute: action.payload }
            const isActive = checkingFilter(newState)
            return state = { ...newState, filterActive: isActive }
        },
        changeFilterSizeAttribute: (state, action: PayloadAction<string[]>) => {
            const newState = { ...state, sizeAttribute: action.payload }
            const isActive = checkingFilter(newState)
            return state = { ...newState, filterActive: isActive }
        },
        changeFilterPriceAttribute: (state, action: PayloadAction<string>) => {
            const newState = { ...state, priceAttribute: action.payload }
            const isActive = checkingFilter(newState)
            return state = { ...newState, filterActive: isActive }
        },
        changeFilterAllAttribute: (state, action: PayloadAction<FilterState>) => {
            const newState = { ...state, ...action.payload }
            const isActive = checkingFilter(newState)
            return state = { ...newState, filterActive: isActive }
        },
        toggleOpenFilterSlider: (state) => {
             state.filterSliderOpen = !state.filterSliderOpen        
        },
        toggleFilterActive: (state, action: PayloadAction<boolean>) => {
            const newState = { ...state, filterActive: action.payload, subCategory: [], colorAttribute: [], sizeAttribute: [], priceAttribute: '0' }
            return state = { ...newState }
        }
    },
});


const checkingFilter = (state: FilterState) => {
    if (state.subCategory.length > 0 || state.colorAttribute.length > 0 || state.sizeAttribute.length > 0 || state.priceAttribute !== '0') {
        return true
    } else {
        return false
    }
}

export const { changeFilterColorAttribute, changeFilterPriceAttribute, changeFilterSizeAttribute, changeFilterSubCategory, toggleFilterActive, changeFilterAllAttribute, toggleOpenFilterSlider } = filterSlice.actions

export default filterSlice.reducer