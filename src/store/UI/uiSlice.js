import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDateModalOpen: false,
    isCategoryModalOpen: false,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
        onOpenCategoryModal: (state) => {
            state.isCategoryModalOpen = true;
        },
        onCloseCategoryModal: (state) => {
            state.isCategoryModalOpen = false;
        }

    }
});

export const { onCloseDateModal, onOpenDateModal, onOpenCategoryModal, onCloseCategoryModal } = uiSlice.actions
