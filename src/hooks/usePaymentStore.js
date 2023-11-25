
import {useDispatch, useSelector} from 'react-redux'
import { onLoadingPayments, onSetPayments, onSetActivePayments, onAddPayments, onUpdatePayments, onDeletePayments,  onSetError, onClearError} from '../store/payment/paymentSlice';
import productApi from '../api/productsApi';



export const usePaymentStore = () => {

    const {payments, isLoading, activePayment, errorMessage, onSetError} = useSelector(state => state.payment);
    const dispatch = useDispatch();

    const setActivePayment = (payment) => {
        dispatch(onSetActivePayments(payment))
    }

    const startLoadingPayment = async() => {
        try{
            dispatch(onLoadingPayments());
            const { data } = await productApi.get('/payment');
            dispatch(onSetPayments(data))
        }catch(error){
            console.log(error)
        }
    }

    const startSavingPayments = async (payment) => {
        try {
          if (payment._id) {
            await productApi.put(`/payment/${payment._id}`, payment);
            dispatch(onUpdatePayments(payment));
            return;
          }
          const response = await productApi.post('/payment', payment, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const data = response.data; // Asignar la respuesta a la variable `data`
          dispatch(onAddPayments({ ...data, _id: data._id }));
          return response; // Devolver la respuesta completa
        } catch (error) {
          console.log(error.request);
        }
      };

    const startDeletePayment = async(payment) => {
        try{
            await productApi.delete(`/payment/${payment._id}`);
            dispatch(onDeletePayments())
        }catch(error){
            dispatch(onSetError(error.responde.data.msg))

            setTimeout(() => {
                dispatch(onClearError())
            }, 10)
        }
    };



    return {
        //props
        payments,
        isLoading,
        activePayment,
        errorMessage,

        //functions
        startLoadingPayment,
        setActivePayment,
        startSavingPayments,
        startDeletePayment,

    }
    
}