import React, {useEffect} from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {
    faPlus,
    faCircleLeft
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AdminProductDatabaseItem} from './AdminProductDatabaseItem';
import {Link} from 'react-router-dom'
import './dashboard.css'
export const AdminProductDatabase = () => {

    const {products, startLoadingProducts} = useProductStore();


    const getProducts = async() => {
        try{
        await startLoadingProducts();
       }catch(error){
           console.log(error)
       }
       }
       
       useEffect(() => {
        getProducts();  
       }, [products])

    return (
        <div className="container">
             <Link to="/administracion">
          <button className="btn btn-outline-warning border-2 mx-5 mb-4">
            <FontAwesomeIcon icon={faCircleLeft}  /> Volver atrás
          </button>
        </Link>
            <div className="d-flex justify-content-center">
                <Link to="/administracion/productos/nuevo-producto" className="text-decoration-none">
            <button className="btn btn-success p-3 d-flex"><FontAwesomeIcon icon={faPlus} className="text-light mt-1 mx-1" /> Agregar producto</button>
                </Link>
            </div>
        <div className="text-dark">
            <h3>Productos</h3>
        <hr />
        <div className="mb-3 mt-2">
            <input type="text" placeholder="Buscar producto" className="w-100 form-control"/>
        </div>
        <table className="table table-light table-hover table-responsive text-light container">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
        {products && products.map(product => (
            <AdminProductDatabaseItem key={product._id} product={product} />
        ))}

        </tbody>
      </table>
        </div>
        </div>
    )
}
