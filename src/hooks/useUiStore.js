import { useDispatch, useSelector } from "react-redux"
import {onSetActiveProduct} from '../store/products/productSlice'
import { onCloseDateModal, onOpenDateModal } from '../store/UI/uiSlice';



export const useUiStore = () => {

    const dispatch = useDispatch();

    //UseSelector permite usar una función del store
    const { isDateModalOpen} = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
       
    }

    const closeDateModal = () => {
        dispatch(onSetActiveProduct(null));
        dispatch(onCloseDateModal());
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
        ? openDateModal()
        : closeDateModal();
    }


    return {
        //Props
        isDateModalOpen,
        //Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,


    }
}
