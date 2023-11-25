import React, {useEffect, useState} from 'react'
import {useCategoryStore} from '../../hooks/useCategoryStore';
import {useUiStore} from '../../hooks/useUiStore';
import Modal from "react-modal";
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
export const AdminCategoryModal = () => {

    const {startSavingCategory, activeCategory} = useCategoryStore();
    const {isCategoryModalOpen, closeCategoryModal } = useUiStore();
    const [formValues, setFormValues] = useState({
        cat: "",
      });

      const onInputChange = ({ target }) => {
        setFormValues({
          ...formValues,
          [target.name]: target.value,
        });
      };


      const handleSave = async(event) => {
        event.preventDefault();
       await startSavingCategory(formValues);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "La categoria fue editada con éxito!",
                showConfirmButton: false,
                timer: 1500,
              });
              closeCategoryModal();
      };


      useEffect(() => {
        if(activeCategory !== null){
            setFormValues({...activeCategory})
        }
    }, [activeCategory])



    return (
        <>
        <Modal  isOpen={isCategoryModalOpen}
      onRequestClose={closeCategoryModal}
      style={customStyles}
      className="modal "
      overlayClassName="modal-fondo"

      >
            <h2 className="text-center">Editar Categoría</h2>
            <hr />
            <form className="container"> 
            <label>Nombre:</label>
        <input
          type="text"
          className="form-control mb-2"
          autoComplete="off"
          name="cat"
          onChange={onInputChange}
          value={formValues.cat}
        />

        <button className="btn btn-success w-100 " onClick={handleSave}>Guardar</button>
            </form>
        </Modal>
        </>
    )
}
