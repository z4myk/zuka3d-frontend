import { useDispatch, useSelector } from "react-redux"
import {onSetActiveProduct} from '../store/products/productSlice'
import { onCloseDateModal, onOpenDateModal, onCloseCategoryModal, onOpenCategoryModal } from '../store/UI/uiSlice';
import {onSetActiveCategory} from '../store/categorys/categorySlice';


export const useUiStore = () => {

    const dispatch = useDispatch();

    //UseSelector permite usar una función del store
    const { isDateModalOpen} = useSelector(state => state.ui);
    const {isCategoryModalOpen} = useSelector(state  => state.ui);


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


    const openCategoryModal = () => {
        dispatch(onOpenCategoryModal())
    };

    const closeCategoryModal = () => {
        dispatch(onSetActiveCategory(null))
        dispatch(onCloseCategoryModal())
    };

    const toggleCategoryModal = () => {
        (isCategoryModalOpen) ? openCategoryModal() : closeCategoryModal();
    }



    return {
        //Props
        isDateModalOpen,
        isCategoryModalOpen,
        //Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,

        openCategoryModal,
        closeCategoryModal,
        toggleCategoryModal,



    }
}
