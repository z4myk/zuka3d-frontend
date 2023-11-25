import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    isLoading: false,
    activeOrder: null,
    errorMessage: undefined,

}

export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        onLoadingOrders: (state) => {
            state.isLoading = false;
        },
        onSetOrders: (state, {payload}) => {
            state.isLoading = false;
            payload.forEach(element => {
                const orderExist = state.orders.some(order => order._id === element._id);
                if(!orderExist){
                    state.orders.push(element);
                }
            })
        },
        onSetActiveOrders: (state, {payload}) => {
            state.activeOrder = payload;
        },
        onAddOrders: (state, {payload}) => {
            state.orders.push(payload);
            state.activeOrder = null;
            
        },
        onUpdateOrders: (state, {payload}) => {
            state.orders = state.orders.map(order => {
                if(order._id === payload._id){
                    return payload
                }
                return order
            })
        },
        onDeleteOrders: (state) => {
            if(state.activeOrder){
                state.orders = state.orders.filter(order => order._id !== state.activeOrder._id);
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

export const { onLoadingOrders, onSetOrders, onSetActiveOrders, onAddOrders, onUpdateOrders, onDeleteOrders, onSetError, onClearError } = orderSlice.actions;

export default orderSlice.reducer;