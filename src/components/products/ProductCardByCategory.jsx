import React, { useState, useEffect } from "react";
import { useProductStore } from "../../hooks/useProductStore";
import { useCategoryStore } from "../../hooks/useCategoryStore";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const ProductCardByCategory = ({ getProductByCategory }) => {
  const [categoryData, setCategoryData] = useState(null);
  const { category } = useParams();
  const {setActiveProduct} = useProductStore();
  useEffect(() => {
    getProductByCategory(category, setCategoryData);
  }, [category]);

  return (
    <>
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
            <div>
              <div className="d-flex justify-content-around mb-3">
                <div className="cardProduct shadow-lg text-dark container card">
                  <div className="">
                    <img src={product.imageURL} className="w-100 mt-1" />
                  </div>
                  <div className="text-center mt-3">
                    <h5>{product.name}</h5>
                  </div>
                  <div>
                    <p className="small text-secondary">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-success">
                      ${product.price} <span className="text-dark">CLP</span>
                    </p>
                  </div>
                  <Link
                    to={`/producto/${product.index}`}
                    className="text-decoration-none"
                  >
                    <button className="btn btn-outline-primary w-100" onClick={() => setActiveProduct(product)} >
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-dark">Cargando productos...</h4>
        )}
      </div>
    </>
  );
};
