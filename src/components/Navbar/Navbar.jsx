import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCircleQuestion,
  faListUl,
  faHome,
  faCartShopping,
  faPhone,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

import zukalogo from '../../assets/zukalogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useCategoryStore } from "../../hooks/useCategoryStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useCartContext } from '../../context/CartContext';
import axios from 'axios'
export const Navbar = () => {

  const { status, user, startLogout } = useAuthStore();
  const { categorys } = useCategoryStore();
  const { cartItems, setSearchProduct } = useCartContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    startLogout();
    navigate('/')
    window.location.reload();
  };

  const clearSearchInput = () => {
    setSearchProduct([])
  }


  return (
    <div>

      <nav className="navbar navbar-expand-lg  bg-dark text-light">
        <div className=" container ">
          <Link to="/" className="text-decoration-none">
          <a className="navbar-brand" href="#">
            <img src={zukalogo} alt="Zukaprint 3D Logo " className="imgLogo" />
          </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 p-3 ">
              <li className="nav-item" onClick={clearSearchInput}>
                <Link to="/" className="text-decoration-none text-light">
                  <a className="nav-link efectoLista text-light" aria-current="page" href="#">
                    <FontAwesomeIcon icon={faHome} className="text-warning" /> INICIO
                  </a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link efectoLista text-light"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faListUl} className="text-warning" /> CATEGORÍAS
                </a>
                <ul className="dropdown-menu">
                  {categorys.map(({ cat }) => (
                    <Link to={`/producto/categoria/${cat}`} className="text-decoration-none" key={cat._id}>
                      <li>
                        <a className="dropdown-item" href="#">
                          <b>{cat}</b>
                        </a>
                      </li>
                    </Link>
                  ))}

                </ul>
              </li>
         
              <li className="nav-item">
                <Link to="/contacto" className="text-decoration-none">
                  <a className="nav-link efectoLista text-light " href="#">
                    <FontAwesomeIcon icon={faPhone} className="text-warning" /> CONTACTO
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/como-comprar" className="text-decoration-none">
                  <a className="nav-link efectoLista text-light" aria-current="page" href="#">
                    <FontAwesomeIcon icon={faCircleQuestion} className="text-warning" /> ¿Cómo Comprar?
                  </a>
                </Link>
              </li>
              {status === "authenticated" &&
                user?.roles?.name === "administrador" ?
                (
                  <li className="nav-item">
                    <Link to="/administracion" className="text-decoration-none">
                      <a className="nav-link efectoLista text-light" >
                        Administración
                      </a>
                    </Link>
                  </li>
                )
                : (
                  <li>

                  </li>

                )
              }
            </ul>

            <Link to="/carrito" className="mt-1 ">
              <FontAwesomeIcon icon={faCartShopping} className=" text-light iconoCart" size="1x" />
            </Link>
            <span className="badge text-light mb-2 ">({status === 'not-authenticated' ? cartItems.length : cartItems.length})</span>
            {status === "authenticated" ? (
              <li className="nav-item dropdown mb-4">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <button className="btn btn-outline-warning mt-4"><FontAwesomeIcon icon={faUser} className="text-light" size="1x" /> <FontAwesomeIcon icon={faSortDown} className="mb-1" /></button>
                </a>
                <ul className="dropdown-menu">
                  <li>
                      <Link to="/mis-compras" className="text-decoration-none">
                    <a className="dropdown-item" href="#">
                      <b className="text-dark">Mis compras</b>
                    </a>
                      </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleLogout}>
                      <b className="text-danger">Salir</b>
                    </a>
                  </li>
                </ul>
              </li>
            )
              : (
                <Link to="/auth/iniciar-sesion" className="text-decoration-none">
                  <button className="btn btn-light border-dark p-2 text-light">Iniciar sesión</button>
                </Link>
              )}
          </div>

        </div>

      </nav>


      
    </div>

  );
};
