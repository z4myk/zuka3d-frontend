import React from "react";
import zukalogo from "../../assets/zukalogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom'
import {
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";



import logoat from '../../assets/logoat.png';
export const Footer = () => {
  return (
    <footer className="p-5 bg-dark mt-5">

      <div className="row container mb-4  container">
        <div className="col-md-4 col-sm-12 text-center">
          <img src={zukalogo} alt="zuka logo " className="w-50" />
          <br />
          <div className="d-flex justify-content-center gap-3 mt-3">
            <a href="https://www.instagram.com/zuka3dprint/?hl=es-la" target="_blank">
            <FontAwesomeIcon icon={faInstagram}  size="2x" className="text-danger"/>
            </a>
              
            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-primary" />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <b>navegación</b>
          <ul>
            <Link to="/" className="text-decoration-none text-light">
            <li>Inicio</li>
            </Link>
            <Link to="/producto/categoria/Funkopops" className="text-decoration-none text-light">
            <li>Categorias</li>
            </Link >
            <Link to="/contacto" className="text-decoration-none text-light">
            <li>Contacto</li>
            </Link>

            <Link to="/como-comprar" className="text-decoration-none text-light"> 
            <li>¿Cómo comprar?</li>
            </Link>
          </ul>
        </div>
        <div className="col-md-4 col-sm-12">
          <b>¿Consultas?</b>
          <ul className="text-decoration-none">
            <li className="deleteBullet">contacto@zuka3d.cl</li>
            <li className="deleteBullet">
              Lunes a viernes de 09:00 a 18:30 hrs <br /> Sábado de 10:00 a 14:00 hrs
            </li>
          </ul>
        </div>
      </div>
      <a href="https://www.aintech.com.ar/" target="_blank" className="text-decoration-none text-light"><p className="text-center mt-5">Sitio web desarrollado por <span className="text-primary">aintech.com.ar</span></p></a>
    </footer>
  );
};
