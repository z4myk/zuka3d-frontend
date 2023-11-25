
import {useDispatch, useSelector} from 'react-redux'
import {onLoadingOrders, onSetOrders, onSetActiveOrders, onAddOrders, onUpdateOrders, onDeleteOrders, onSetError, onClearError} from '../store/orders/orderSlice';
import productApi from '../api/productsApi';
import {usePaymentStore} from '../hooks/usePaymentStore'

export const useOrderStore = () => {

    const {orders, isLoading, activeOrder, errorMessage, onSetError} = useSelector(state => state.order);
    const dispatch = useDispatch();
  

    const setActiveOrder = (order) => {
        dispatch(onSetActiveOrders(order))
    }

    const startLoadingOrder = async() => {
        try{
            dispatch(onLoadingOrders());
            const { data } = await productApi.get('/orders');
            dispatch(onSetOrders(data))
        }catch(error){
            console.log(error)
        }
    }

    const startSavingOrders = async (order) => {
        try {
          if (order._id) {
            await productApi.put(`/orders/${order._id}`, order);
            dispatch(onUpdateOrders(order));
            return;
          }
          const response = await productApi.post('/orders', order, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          const data = response.data; // Asignar la respuesta a la variable `data`
          dispatch(onAddOrders({ ...data, _id: data._id }));
          return response; // Devolver la respuesta completa
        } catch (error) {
          console.log(error.request);
        }
      };

    const startDeleteOrder = async(order) => {
        try{
            await productApi.delete(`/orders/${order._id}`);
            dispatch(onDeleteOrders())  
        }catch(error){
            dispatch(onSetError(error.responde.data.msg))

            setTimeout(() => {
                dispatch(onClearError())
            }, 10)
        }
    };



    return {
        //props
        orders,
        isLoading,
        activeOrder,
        errorMessage,

        //functions
        startLoadingOrder,
        setActiveOrder,
        startSavingOrders,
        startDeleteOrder,

    }
    
}