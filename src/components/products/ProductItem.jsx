import React from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
  } from "@fortawesome/free-solid-svg-icons";
export const ProductItem = ({product}) => {

    const {activeProduct, setActiveProduct} = useProductStore();

    const handleSubmit = () => {
        if (activeProduct == null || activeProduct._id !== product._id) {
          setActiveProduct(product);
          
        }
      }

    return (
        <div className="d-flex justify-content-around mb-3" >

        <div className="cardProduct shadow-lg text-dark container card">
            <div className="">
                <img src={product.imageURL}  className="w-100 mt-1"/>
            </div>
            <div className="text-center mt-3">
                <h5><b>{product.name}</b></h5>
               
            </div>
            <div>
                <p className="small text-secondary">{product.category}</p>
            </div>
            <div className="d-flex justify-content-between">
            <p className="text-success">${product.price} <span className="text-dark">CLP</span></p>
            <FontAwesomeIcon icon={faHeart} className="text-secondary"  />
            </div>
            <Link to={`/producto/${product.index}`} className="text-decoration-none">
           <button className="btn btn-light text-light w-100" onClick={handleSubmit} >Ver más</button>
            </Link>
        </div>
        </div>
    )
}
