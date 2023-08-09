import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    isLoading: false,
    activeProduct: null,
    errorMessage: undefined,

}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        onLoadingProducts: (state) => {
            state.isLoading = false;
        },
        onSetProducts: (state, {payload}) => {
            state.isLoading = false;
            payload.forEach(element => {
                const productExist = state.products.some(product => product._id === element._id);
                if(!productExist){
                    state.products.push(element);
                }
            })
        },
        onSetActiveProduct: (state, {payload}) => {
            state.activeProduct = payload;
        },
        onAddProduct: (state, {payload}) => {
            state.products.push(payload);
            state.activeProduct = null;
            
        },
        onUpdateProduct: (state, {payload}) => {
            state.products = state.products.map(product => {
                if(product._id === payload._id){
                    return payload
                }
                return product
            })
        },
        onDeleteProduct: (state) => {
            if(state.activeProduct){
                state.products = state.products.filter(product => product._id !== state.activeProduct._id);
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

export const { onLoadingProducts, onSetActiveProduct, onAddProduct, onSetProducts, onUpdateProduct, onDeleteProduct, onSetError, onClearError } = productSlice.actions;

export default productSlice.reducer;