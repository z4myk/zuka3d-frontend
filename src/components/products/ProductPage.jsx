import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../hooks/useProductStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useCartContext } from "../../context/CartContext";
import {useForm} from "../../hooks/useForm";
import { ProductRecommended } from "../products/ProductRecommended";
import Swal from "sweetalert2";
export const ProductPage = () => {
  const params = useParams();
  const { status } = useAuthStore();
  const { products, activeProduct, setActiveProduct } = useProductStore();
  const {onInputChange} = useForm();
  const { addToCart } = useCartContext();
  const navigate = useNavigate();
 
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  const [isChecked, setIsChecked] = useState(false)


  const priceAccesories = 5000

  const valueWithAccessories = selectedAccessories && isChecked === true ? activeProduct?.price + priceAccesories * selectedAccessories : activeProduct?.price;

  
  const onChangeHandler = (e) => {
    const formFieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value
  
    setSelectedAccessories( e.target.name)
    setIsChecked(e.target.checked)
    
    
  }

  
 

  const handleAddToCart = () => {

    const productToAdd = {
      ...activeProduct,
      selectedAccessories: selectedAccessories, // Añade los accesorios seleccionados al objeto
      price: valueWithAccessories // Añade el valor total del producto con accesorios al objeto
    };

    addToCart(productToAdd);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Tu producto se agrego con exito!",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  

  useEffect(() => {
    if (activeProduct == null && products.length > 0) {
      const { 0: product } = products.filter(
        (product) => product.index === params.index
      );
      setActiveProduct(product);
    }
  }, [products]);



 

  return (
    <>
      {activeProduct === null ? (
        "Cargando..."
      ) : (
        <>
          <div className="container text-dark mt-3 ">
            <div className="row container pt-2">
              <div className="col-sm-12 col-md-6">
                <h1 className="text-dark text-center">{activeProduct?.name}</h1>
                <hr />
                <div className="">
                  <div className="text-center">
                    <span>
                      <b>Categoría:</b>
                    </span>
                    <br />
                  </div>
                  <div className="text-center">
                    <span className="text-secondary">
                      {activeProduct?.category}
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span>
                      <b>Descripción:</b>
                    </span>
                    <br />
                    <p>{activeProduct?.description}</p>
                  </div>
                  <div className="mt-3">
  <span>
    <b>Accesorios:</b>
  </span>
  <br />
  
  {  activeProduct?.maxAccessories !==  0 ? ([...Array(activeProduct?.maxAccessories).keys()].map((index) => (
    <div key={index + 1} className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name={index + 1}
        onChange={onChangeHandler}
        
      />
      <label
        className="form-check-label "
       
      >
        Agregar  {index + 1} accesorios
      </label>
    </div>
  ))) : (<b>❌Este producto no posee accesorios </b>)}
</div>
                  <h3 className="text-success mt-2 text-center">
                    
                    {valueWithAccessories}{" "}
                    <span className="text-dark">CLP</span>
                  </h3>
                </div>
                <button
                  className="btn btn-outline-success w-100"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </button>
                <p className="text-dark mt-3">
                  ✔️ Paga con deposito o transferencia bancaria.
                </p>
                <div className="mt-5">
                  <table class="table border">
                    <thead>
                      <tr>
                        <th scope="col">Medidas</th>
                        <th scope="col">Ancho (X)</th>
                        <th scope="col">Altura (Y)</th>
                        <th scope="col">Profundidad (Z)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">#</th>
                        <td>{activeProduct?.broad}cm</td>
                        <td>{activeProduct?.height}cm</td>
                        <td>{activeProduct?.depth}cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-sm-12 col-md-6">
                <img src={activeProduct?.imageURL} className="w-100 " />
              </div>
            </div>
            {/* <ProductRecommended product={recommendedProducts}/>  */}
          </div>
        </>
      )}
    </>
  );
};
