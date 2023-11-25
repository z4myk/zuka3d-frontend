import React, {useEffect} from 'react'
import {ProductItem} from '../products/ProductItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
  } from "@fortawesome/free-solid-svg-icons";
import {useProductStore} from '../../hooks/useProductStore';
import {useCartContext} from "../../context/CartContext";
import {Link} from 'react-router-dom';
import {ProductItemRecommended} from '../products/ProductItemRecommended';
export const ProductRecommended = ({product}) => {




    return (
        <>
                <h2 className="mt-4"><b>Productos recomendados</b></h2> 
                <div className="bg-warning p-1 w-25 container"></div>
            <section className="d-flex justify-content-around mb-3 mt-5 flex-wrap">
            {product?.map((prod) => (
                <ProductItemRecommended product={prod} key={prod._id }/>
            ))}
            </section>
        </>
    )
}
