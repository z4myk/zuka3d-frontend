import React from 'react'
import {Link} from 'react-router-dom';   
import {useCategoryStore} from '../../hooks/useCategoryStore'
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import axios from 'axios'
const formFields = {
  cat: "",
};

export const AddCategory = () => {

  const {startSavingCategory} = useCategoryStore();
  const {
    formState, onInputChange, onResetForm} = useForm(formFields);

  const handleAddCategory = async (e) => {
    e.preventDefault();
   
    try{
      const response = await startSavingCategory(formState);
      console.log(response?.status);
      if (response && response?.status) {
        if (response.status === 200 || response.status === 201) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "La categoria fue agregada con éxito!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      onResetForm(formState)
    }catch(error){
       // Manejar el error aquí
       Swal.fire(
        "Ocurrió un error al guardar la categoria",
        error.message,
        "error"
      );
      console.log(error);
    }
  }
    return (
        <div className="mb-3">
            <h3 className="text-dark"> Agregar Categoria</h3>
          <hr className="text-dark" />

        <form className="mb-3 mt-2 text-dark" onSubmit={handleAddCategory}>
        <label className="mt-1 mb-1">Nombre de la categoría:</label>
          <input
            type="text"
            placeholder="Categoria"
            className="w-100 form-control"
            name="cat"
            value={formState.cat}
            onChange={onInputChange}
            required
          />
          <button className="btn btn-success w-100 mt-2" type="submit" >{" "}
            Agregar
          </button>
        </form>
        </div>
    )
}
