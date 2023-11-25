import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payments: [],
    isLoading: false,
    activePayment: null,
    errorMessage: undefined,

}

export const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        onLoadingPayments: (state) => {
            state.isLoading = false;
        },
        onSetPayments: (state, {payload}) => {
            state.isLoading = false;
            payload.forEach(element => {
                const paymentExist = state.payments.some(payment => payment._id === element._id);
                if(!paymentExist){
                    state.payments.push(element);
                }
            })
        },
        onSetActivePayments: (state, {payload}) => {
            state.activePayment = payload;
        },
        onAddPayments: (state, {payload}) => {
            state.payments.push(payload);
            state.activePayment = null;
            
        },
        onUpdatePayments: (state, {payload}) => {
            state.payments = state.payments.map(payment => {
                if(payment._id === payload._id){
                    return payload
                }
                return order
            })
        },
        onDeletePayments: (state) => {
            if(state.activePayment){
                state.payments = state.payments.filter(payment => payment._id !== state.activePayment._id);
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

export const { onLoadingPayments, onSetPayments, onSetActivePayments, onAddPayments, onUpdatePayments, onDeletePayments, onSetError, onClearError } = paymentSlice.actions;

export default paymentSlice.reducer;