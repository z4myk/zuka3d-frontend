import React, {useEffect} from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {ProductCard} from '../products/ProductCard';
import zukalogo from '../../assets/zukalogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faMagnifyingGlass,
    faRightToBracket,
    faScrewdriver,
    faUser,
    faTowerCell,
    faListUl,
    faHome,
    faCartShopping,
    faPhone,
  } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
export const HomePage = () => {

    const {products, startLoadingProducts} = useProductStore();


    return (
        <div className="container">
            <div className="text-center">
            <img src={zukalogo} className="w-50 " />
            </div>
            <form className="d-flex mb-4" role="search">
              <input
                className="form-control me-1 "
                type="search"
                placeholder="Buscar producto..."
                aria-label="Search"
              />
              <button className="btn btn-outline-warning" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              
            </form>
            <section>
            <ProductCard />
            </section>


        </div>
    )
}
