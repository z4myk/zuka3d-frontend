import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categorys: [],
    isLoading: false,
    activeCategory: null,
    errorMessage: undefined,

}

export const categorySlice = createSlice({
    name: 'categorys',
    initialState,
    reducers: {
        onLoadingCategory: (state) => {
            state.isLoading = false;
        },
        onSetCategory: (state, {payload}) => {
            state.isLoading = false;
            payload.forEach(element => {
                const categoryExist = state.categorys.some(category => category._id === element._id);
                if(!categoryExist){
                    state.categorys.push(element);
                }
            })
        },
        onSetActiveCategory: (state, {payload}) => {
            state.activeCategory = payload;
        },
        onAddCategory: (state, {payload}) => {
            state.categorys.push(payload);
            state.activeCategory = null;
            
        },
        onUpdateCategory: (state, {payload}) => {
            state.categorys = state.categorys.map(category => {
                if(category._id === payload._id){
                    return payload
                }
                return category
            })
        },
        onDeleteCategory: (state) => {
            if(state.activeCategory){
                state.categorys = state.categorys.filter(category => category._id !== state.activeCategory._id);
            }
        },
        onSetError: (state, { payload }) => {
            state.errorMessage = payload;
        },
        onClearError: (state) => {
            state.errorMessage = undefined;
        },
            
    }
})

export const { onLoadingCategory, onSetActiveCategory, onAddCategory, onSetCategory, onUpdateCategory, onDeleteCategory, onSetError, onClearError } = categorySlice.actions;

export default categorySlice.reducer;