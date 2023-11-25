import React, {useEffect} from 'react'
  import {useProductStore} from '../../hooks/useProductStore';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
  } from "@fortawesome/free-solid-svg-icons";
import {ProductCard} from '../products/ProductCard';
  import {useCartContext} from "../../context/CartContext";
  import Swal from "sweetalert2";
export const ProductItem = ({product}) => {

    const {activeProduct, setActiveProduct, products} = useProductStore();
    const { addToCart} = useCartContext();

   

    return (
        <>
          {
            product.map((item) => (
              <div key={item._id}>
                <ProductCard  {...item} />
              </div>
            ))
          }
        </>
    )
}
