import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
  } from "@fortawesome/free-solid-svg-icons";
  import { Link } from "react-router-dom";
  import {useCartContext} from "../../context/CartContext";
  import {useProductStore} from '../../hooks/useProductStore';
  import Swal from 'sweetalert2'
export const ProductItemByCategory = ({product}) => {
    const {setActiveProduct} = useProductStore();
    const { addToCart} = useCartContext();
    const handleAddToCart = () => {
        addToCart(product);
        Swal.fire({
            position: 'center',
          icon: 'success',
          title: '¡Tu producto se agrego con exito!',
          showConfirmButton: false,
          timer: 1000
        })
      };

    return (
        <>
             <div>
              <div className="d-flex justify-content-around mb-3">
                <div className="cardProduct shadow-lg text-dark container card" key={product._id}>
                  <div className="">
                    <img src={product.imageURL} className="w-100 mt-1" />
                  </div>
                  <div className="text-center mt-3">
                    <h5>{product.name}</h5>
                  </div>
                  <div>
                    <p className="small text-secondary">{product.category}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-success">
                      ${product.price} <span className="text-dark">CLP</span>
                    </p>
                    <FontAwesomeIcon icon={faCartPlus} className="text-secondary cartHover" onClick={handleAddToCart} />
                  </div>
                  <Link
                    to={`/producto/${product.index}`}
                    className="text-decoration-none"
                  >
                    <button className="btn btn-light text-light w-100" onClick={() => setActiveProduct(product)} >
                      Ver más
                    </button>
                  </Link>
                </div>
              </div>
            </div>
        </>
    )
}
