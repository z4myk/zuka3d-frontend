import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {useProductStore} from '../../hooks/useProductStore';
import {useCategoryStore} from '../../hooks/useCategoryStore';
import {useUiStore} from '../../hooks/useUiStore';
import Swal from "sweetalert2";
Modal.setAppElement("#root");

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };


export const ProductModal = () => {
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { startSavingProducts, activeProduct } = useProductStore();
    const { categorys, startLoadingCategory } = useCategoryStore();

    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
        category:"",
        price: "",
        broad: "",
        depth: "",
        height: "",
        image: "",
      });


      const onInputChange = ({ target }) => {
        setFormValues({
          ...formValues,
          [target.name]: target.value,
        });
      };

      const types = ['image/png', 'image/jpeg'];
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && types.includes(file.type)) {
          setFormValues({
            ...formValues,
            image: file,
          });
        }
      };
    
      const handleSave = async(event) => {
        event.preventDefault();
       await startSavingProducts(formValues);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "El producto fue editado con éxito!",
                showConfirmButton: false,
                timer: 1500,
              });
        closeDateModal();
      };

    useEffect(() => {
        if(activeProduct !== null){
            setFormValues({...activeProduct})
        }
    }, [activeProduct])



    return (

        <div>
            <Modal
      isOpen={isDateModalOpen}
      onRequestClose={closeDateModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h2 className="text-center pt-1"> Editar Producto </h2>
      <hr className=""/>
      <form className="container">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control mb-2"
          autoComplete="off"
          name="name"
          onChange={onInputChange}
          value={formValues.name}
        />
        <label>Precio:</label>
        <input
          type="number"
          className="form-control mb-2"
          autoComplete="off"
          name="price"
          onChange={onInputChange}
          value={formValues.price}
        />
            <label>Categoría:</label>
            <select
              class="form-select"
              placeholder="Categoría"
              name="category"
              value={formValues.category}
              onChange={onInputChange}
            >
              <option selected>Seleccionar categoría</option>
              {categorys.map(({cat}) => (
                <option>{cat}</option>
              ))}
            </select>
        <label>Descripción</label>
        <textarea
          type="text"
          className="form-control mb-2"
          autoComplete="off"
          name="description"
          onChange={onInputChange}
          value={formValues.description}
        />
        <label>Ancho(X)</label>
        <input
          type="text"
          className="form-control mb-2"
          autoComplete="off"
          name="broad"
          onChange={onInputChange}
          value={formValues.broad}
        />
        <label>Altura(Y)</label>
        <input
          type="text"
          className="form-control mb-1"
          autoComplete="off"
          name="height"
          onChange={onInputChange}
          value={formValues.height}
        />
        <label>Profundidad(Z)</label>
        <input
          type="text"
          className="form-control mb-1"
          autoComplete="off"
          name="depth"
          onChange={onInputChange}
          value={formValues.depth}
        />
          
        <button
          type="submit"
          className={`btn btn-success form-control my-2`}
          onClick={handleSave}
        >
          {" "} 
          Guardar
        </button>
      </form>
    </Modal>
        </div>
    )
}
