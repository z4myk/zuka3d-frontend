
import {useDispatch, useSelector} from 'react-redux'
import {onLoadingCategory, onSetActiveCategory, onAddCategory, onSetCategory, onUpdateCategory, onDeleteCategory, onSetError, onClearError} from '../store/categorys/categorySlice';
import productApi from '../api/productsApi';



export const useCategoryStore = () => {

    const {categorys, isLoading, activeCategory, errorMessage, onSetError} = useSelector(state => state.category);
    const dispatch = useDispatch();

    const setActiveCategory = (category) => {
        dispatch(onSetActiveCategory(category))
    }

    const startLoadingCategory = async() => {
        try{
            dispatch(onLoadingCategory());
            const { data } = await productApi.get('/category');
            dispatch(onSetCategory(data))
        }catch(error){
            console.log(error)
        }
    }

    const startSavingCategory = async (category) => {
      try {
        if (category._id) {
          await productApi.put(`/category/${category._id}`, category);
          dispatch(onUpdateCategory(category));
          return;
        }
    
        const response = await productApi.post('/category', category, {
          headers: {
            'Content-Type': 'application/json', // Tipo de contenido que enviarás (en este caso JSON)
            // Otras cabeceras si es necesario
          },
        });
  
        const data = response.data; // Asignar la respuesta a la variable `data`
        dispatch(onAddCategory({ ...data, _id: data._id }));
        return response; // Devolver la respuesta completa
      } catch (error) {
        console.log(error.request);
      }
    };

    const startDeleteCategory = async(category) => {
        try{
            await productApi.delete(`/category/${category._id}`);
            dispatch(onDeleteCategory())
        }catch(error){
            dispatch(onSetError(error.responde.data.msg))

            setTimeout(() => {
                dispatch(onClearError())
            }, 10)
        }
    };





    return {
        //props
        categorys,
        isLoading,
        activeCategory,
        errorMessage,
        
        //functions
        startLoadingCategory,
        setActiveCategory,
        startSavingCategory,
        startDeleteCategory,
      

    }
    
}

