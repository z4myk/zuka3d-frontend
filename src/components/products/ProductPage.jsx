import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../hooks/useProductStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import {useCartContext} from '../../context/CartContext';
import {ProductRecommended} from '../products/ProductRecommended';
import Swal from 'sweetalert2'
export const ProductPage = () => {
  const params = useParams();
  const {status} = useAuthStore();
  const { products, activeProduct, setActiveProduct } = useProductStore();
  const {addToCart} = useCartContext();
  const navigate = useNavigate()
  // const recommendedProducts = products.filter((product) => activeProduct.category === product.category  && activeProduct._id !== product._id).slice(0, 4);


  const handleAddToCart = () => {
    addToCart(activeProduct);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Tu producto se agrego con exito!',
      showConfirmButton: false,
      timer: 1000
    })
    
  };


    useEffect(() => {
      if (activeProduct == null && products.length > 0) {
        const { 0: product } = products.filter(
          (product) => product.index === params.index
          );
          setActiveProduct(product)
      }
    }, [products]);
  


  return (
    <>
      {activeProduct === null ? (
        "Cargando..."
      ) : (
        <>

       
        <div className="container text-dark text-center">
          <div className="row container pt-2">
            <div className="col-sm-12 col-md-6">
              <h1 className="text-dark text-center">{activeProduct?.name}</h1>
              <hr />
              <div className="">
                <span>Categoría:</span>
                <br />
                <span className="text-secondary">{activeProduct?.category}</span>
                <div className="mt-3">
                  <span>Descripción:</span>
                  <br />
                  <span>{activeProduct?.description}</span>
                </div>
                <h3 className="text-success mt-2">${activeProduct?.price} <span className="text-dark">CLP</span></h3>
              </div>
                <button className="btn btn-outline-success w-100" onClick={handleAddToCart}>Agregar al carrito</button>
              <p className="text-dark mt-3">✔️ Paga con deposito o transferencia bancaria.</p>
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

            <div
              className="col-sm-12 col-md-6"

            >
              <img
                src={activeProduct?.imageURL}
                className="w-100 "
              />
            </div>
          </div>
          {/* <ProductRecommended product={recommendedProducts}/>  */}
        </div>
        </>
      )}
    </>
  );
};  
