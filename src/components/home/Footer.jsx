import React from "react";
import zukalogo from "../../assets/zukalogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <FontAwesomeIcon icon={faInstagram}  size="2x" className="text-danger"/>
            <FontAwesomeIcon icon={faFacebook} size="2x" className="text-primary" />
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <b>navegación</b>
          <ul>
            <li>Inicio</li>
            <li>Categorias</li>
            <li>Contacto</li>
            <li>¿Cómo comprar?</li>
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
      <a href="https://www.aintech.com.ar/" target="_blank" className="text-decoration-none text-light"><p className="text-center mt-5">Sitio web desarrollado por Aintech Agency <img src={logoat} className="imgLogoFooter" /></p></a>
    </footer>
  );
};
