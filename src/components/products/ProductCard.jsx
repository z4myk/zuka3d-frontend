import React , {useEffect} from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {ProductItem} from '../products/ProductItem'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartPlus,
  } from "@fortawesome/free-solid-svg-icons";

  import {useCartContext} from "../../context/CartContext";
  import Swal from "sweetalert2";
export const ProductCard = (item) => {

    const {products, setActiveProduct, activeProduct} = useProductStore();
    const {addToCart} = useCartContext();

    const handleSubmit = () => {
        if (activeProduct == null || activeProduct._id !== item._id) {
          setActiveProduct(item);
          
        }
      }

 const handleAddToCart = () => {
    addToCart(item);
    Swal.fire({
        position: 'center',
      icon: 'success',
      title: '¡Tu producto se agrego con exito!',
      showConfirmButton: false,
      timer: 1000
    })
  };
  




  useEffect(() => {
    setActiveProduct(item)
  }, [products])

    return (
        <div className=" flex-wrap ">
            {/* {products?.map((product) => (
                <ProductItem  product={product} key={product._id} />
            )).reverse()} */}
        <div className="mb-3" >
<div className="cardProduct shadow-lg text-dark container card">
    <div className="">
        <img src={item.imageURL}  className="p-2 mt-1 border-dark"/>
    </div>
    <div className="text-center mt-3">
        <h5><b>{item.name}</b></h5>
    </div>
    <div>
        <p className="small text-secondary descriptionProduct">{item.category}</p>
    </div>
    <div className="d-flex justify-content-between">
    <p className="text-success">${item.price} <span className="text-dark">CLP</span></p>
    <FontAwesomeIcon icon={faCartPlus} className="text-secondary cartHover" onClick={handleAddToCart} />
    </div>
    <Link to={`/producto/${item.index}`} className="text-decoration-none">
   <button className="btn btn-light text-light w-100" onClick={handleSubmit} >Ver más</button>
    </Link>
</div>

        </div>
        </div>
    )
}
