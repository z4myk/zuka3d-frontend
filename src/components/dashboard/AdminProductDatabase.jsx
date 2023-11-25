import React, {useEffect, useState} from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {
    faPlus,
    faCircleLeft
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {AdminProductDatabaseItem} from './AdminProductDatabaseItem';
import {useCounter} from '../../hooks/useCounter';
import {Pagination} from '../home/Pagination';

import {Link} from 'react-router-dom'
import './dashboard.css'
export const AdminProductDatabase = () => {

    const {products, startLoadingProducts} = useProductStore();
    const { counter, decrement, increment, reset } = useCounter(1);
    const maxProducts = 20;
    const lastPage = Math.ceil(products?.length / maxProducts);

    const [gameSearch, setGameSearch] = useState('');
    const [elementSearch, setElementSearch] = useState([])



    const getSearchData = () => {
      const filterData = products.filter((product) => product.name.toLowerCase().includes(gameSearch.toLowerCase())).reverse();
      if (gameSearch.trim() === '') {
        setElementSearch(products);
      } else {
        setElementSearch(filterData)
      }
    }
       
       useEffect(() => {
         getSearchData();
       }, [products, gameSearch])

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
            <input type="text" placeholder="Buscar producto" className="w-100 form-control"  value={gameSearch}
            name="search"
            onChange={(e) => setGameSearch(e.target.value)} />
        </div>
        <div className="p-2 table-responsive">
        <table className="table table-light table-hover  text-light container">
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
        {elementSearch?.slice(
            (counter - 1) * maxProducts,
            (counter - 1) * maxProducts + maxProducts
          ).map((product) => (
            <AdminProductDatabaseItem key={product._id} product={product}  />
          )).reverse()}

        </tbody>
      </table>
          <Pagination 
            page={counter}
            decrement={decrement}
            increment={increment}
            lastPage={lastPage}
            />
      </div>
        </div>
        </div>
    )
}
