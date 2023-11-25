import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useProductStore } from "../../hooks/useProductStore";
import Swal from "sweetalert2";
import { useCategoryStore } from "../../hooks/useCategoryStore";

const formFields = {
  name: "",
  image: "",
  category: "",
  description: "",
  price: "",
  height: "",
  broad: "",
  depth: "",
};

export const AddProduct = () => {
  const {
    name,
    image,
    category,
    description,
    price,
    height,
    broad,
    depth,
    onInputChange,
    formState,
    setFormState,
    onResetForm,
  } = useForm(formFields);

  const { startSavingProducts } = useProductStore();

  const { categorys, startLoadingCategory } = useCategoryStore();

  const navigate = useNavigate();


  const types = ["image/png", "image/jpeg"];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && types.includes(file.type)) {
      formState.image = file;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si formState.image está definido
    if (formState.image !== undefined) {
      console.log(formState.image)
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("category", formState.category);
      formData.append("description", formState.description);
      formData.append("price", formState.price);
      formData.append("height", formState.height);
      formData.append("broad", formState.broad);
      formData.append("depth", formState.depth);
      formData.append("image", formState.image);
      try {
        const response = await startSavingProducts(formData);
        console.log(response.status);
        if (response && response.status) {
          if (response.status === 200 || response.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "El producto fue agregado con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/administracion/productos")
          }
        }
        onResetForm(formState);
      } catch (error) {
        // Manejar el error aquí
        Swal.fire(
          "Ocurrió un error al guardar el producto",
          error.message,
          "error"
        );
        console.log(error);
      }
    } else {
      // Manejar el caso cuando formState.image es undefined
      console.log("Error: No se ha seleccionado un archivo de imagen");
    }
  };

  return (
    <div className="">

      <Link to="/administracion/productos">
          <button className="btn btn-outline-warning border-2 mx-5">
            <FontAwesomeIcon icon={faCircleLeft}  /> Volver atrás
          </button>
        </Link>
      <h3 className="text-dark text-center mb-3">Agregar producto</h3>
      
      <hr className="text-dark container" />
      <div className="container text-dark d-flex justify-content-center">
        <form
          className="mb-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="mb-3">
            <label>Titulo:</label>
            <input
              type="text"
              placeholder="Titulo"
              value={name}
              name="name"
              onChange={onInputChange}
              className="w-100 p-2 form-control inputBorders"
              required
            />
          </div>
          <div className="mb-3">
            <label>Imagen:</label>
            <input
              type="file"
              className="w-100 p-1 form-control "
              name="image"
              onChange={(e) => handleImageChange(e)}
            />
          </div>
          <div className="mb-3">
            <label>Categoría:</label>
            <select
              class="form-select"
              placeholder="Categoría"
              name="category"
              value={category}
              onChange={onInputChange}
            >
              <option selected>Seleccionar categoría</option>
              {categorys.map(({cat}) => (
                <option>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Descripción:</label>
            <textarea
              type="text"
              placeholder="descripción"
              name="description"
              value={description}
              onChange={onInputChange}
              className="w-100 p-2 form-control p-2 inputBorders"
              required
            />
          </div>
          <div className="mb-3">
            <label>Precio:</label>
            <input
              type="number"
              placeholder="Precio"
              name="price"
              value={price}
              onChange={onInputChange}
              className="w-100 p-2 form-control inputBorders"
              required
            />
          </div>
          <div className="mb-3">
            <label>Altura:</label>
            <input
              type="text"
              placeholder="altura"
              name="height"
              value={height}
              onChange={onInputChange}
              className="w-100 p-2 form-control inputBorders"
              required
            />
          </div>
          <div className="mb-3">
            <label>Ancho:</label>
            <input
              type="text"
              placeholder="ancho"
              name="broad"
              value={broad}
              onChange={onInputChange}
              className="w-100 p-2 form-control inputBorders"
              required
            />
          </div>
          <div className="mb-3">
            <label>Profundidad:</label>
            <input
              type="text"
              placeholder="Profundidad"
              name="depth"
              value={depth}
              onChange={onInputChange}
              className="w-100 p-2 form-control inputBorders"
              required
            />
          </div>
          <button className="w-100 btn btn-success" type="submit">
            Agregar
          </button>
        </form>
      </div>
    </div>
  );
};
