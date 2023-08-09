import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useProductStore } from '../../hooks/useProductStore';
import {useCategoryStore} from '../../hooks/useCategoryStore';
import {
    faList,
  } from "@fortawesome/free-solid-svg-icons";
export const Dashboard = () => {

    const {products, startLoadingProducts} = useProductStore();
    const {categorys, startLoadingCategory} = useCategoryStore();




    return (
        <>
            <h1 className="text-dark text-center mb-5">Administración</h1>

            <section className="container text-dark">
                <div className="row">
                    <div className="col-sm-12 col-md-4 text-center">
                        <h4 className="text-center">Menu</h4>
                        <hr />
                        <Link to="/administracion/productos" className="text-decoration-none">
                        <button className="btn btn-success w-100">Productos</button>
                        </Link>
                        <hr />
                        <Link to="/administracion/categorias">
                        <button className="btn btn-success w-100">Categorias</button>
                        </Link>
                        <hr />
                        <button className="btn btn-warning w-100 mb-4 text-light"><FontAwesomeIcon icon={faList} className="mx-1"/> Ver pedidos (0)</button>
                        
                    </div>
                        <div className="col-sm-12 col-md-8">
                            <h4 className="text-center">Panel de visualización</h4>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <div className="mx-2 ">
                                <p>Productos cargados: ({products.length})</p>
                                </div>
                                <div>
                                <p>Categorias cargadas: ({categorys.length})</p>
                                </div>
                            </div>

                        </div>
                </div>
            </section>
        </>
    )
}
