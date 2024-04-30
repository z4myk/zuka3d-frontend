import React, { useState, useEffect } from "react";
  import {ProductItemByCategory} from '../products/ProductItemByCategory';
  import {useCartContext} from "../../context/CartContext";
import { useParams } from "react-router-dom";
import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProductCardByCategory = ({ getProductByCategory }) => {
  const [categoryData, setCategoryData] = useState(null);
  const { category } = useParams();
  const { addToCart} = useCartContext();

  useEffect(() => {
    getProductByCategory(category, setCategoryData);
  }, [category]);


  return (
    <>
      <marquee className="bg-warning  text-light w-100 p-2"> <b className="">🛒 ENVIOS GRATIS A TODO EL PAIS POR COMPRAS SUPERIORES A $120.000 COBERTURA EN TODO CHILE!</b> </marquee>
      <h4 className="text-dark container mt-3">
        <b>{category}</b>
      </h4>
      <p className="text-dark container">
        Mostrando los {categoryData?.length} resultados
      </p>
      <hr className="text-dark" />
      <div className="productCard d-flex justify-content-around flex-wrap text-dark container">
        {categoryData !== null ? (
          categoryData.map((product) => (
           <ProductItemByCategory product={product} key={product._id}/>
          ))
        ) : (
          <h4 className="text-dark">Cargando productos...</h4>
        )}
      </div>
      <a href="https://wa.me/56921983534" target="_blank">
        <div className="floating-button">
        <button className="btn btn-success rounded-5 p-2">
        <FontAwesomeIcon icon={faWhatsapp} size="3x " clasName="btn-whatsapp" />
        </button>
        </div>
        </a>
    </>
  );
};
