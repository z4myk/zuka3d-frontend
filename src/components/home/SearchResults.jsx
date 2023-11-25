import React from "react";
import { useCartContext } from "../../context/CartContext";
import { ProductItem } from "../../components/products/ProductItem";
export const SearchResults = () => {
  const {
    searchProduct,
    getSearchProduct,
    msgError,
    search,
  } = useCartContext();

  return (
    <>
      <div className="container">
        <h5 className="mt-3 text-dark ">
          Resultado de la busqueda:{" "}
          {msgError === true ? "No se encontraron resultados" : search}
        </h5>
        <p className="text-dark container">
          Mostrando los {searchProduct.length} resultados
        </p>
        <hr className="text-dark" />
        <div className=" d-flex justify-content-around flex-wrap ">
          <ProductItem product={searchProduct} key={searchProduct._id} />
        </div>
      </div>
    </>
  );
};
