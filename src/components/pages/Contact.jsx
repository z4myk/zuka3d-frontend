import React from 'react'
import zukalogo from "../../assets/zukalogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  {Link} from 'react-router-dom'
import {
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";



import logoat from '../../assets/logoat.png';
export const Contact = () => {
    return (
        <>
        <section>
            <h1 className="text-dark text-center">Contáctanos</h1>
            <div className="bg-warning p-2 container"></div>
            <hr />
        </section>
        <section className="container row">
            <div className="col-sm-12 col-md-6">
            <img src={zukalogo} className="w-100"/>
                        <hr className="text-warning" />
                        <div className="d-flex justify-content-center gap-3">
                            <a href="https://www.instagram.com/zuka3dprint/?hl=es-la" target="_blank">
                            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-danger" />
                            </a>
                            <FontAwesomeIcon icon={faFacebook}  size="2x" className="text-primary" />
                        </div>
                       
                            <p className="text-dark text-center mt-3 "><b>E-mail: contacto@zuka3d.cl</b></p>

            </div>
            <form className="col-sm-12 col-md-6">
                <div className="mb-3">
                    <label className="text-dark">Nombre</label>
                    <input type="text" className="form-control" placeholder="ingrese su nombre" required/>
                </div>
                <div  className="mb-3">
                    <label className="text-dark">Email</label>
                    <input type="email" className="form-control" placeholder="ingrese su email" required/>
                </div>
                <div  className="mb-3">
                    <label className="text-dark">Mensaje</label>
                    <textarea className="form-control" placeholder="Ingrese su mensaje" required></textarea>
                </div>
                <button className="btn btn-success w-100 mt-2">Enviar</button>
            </form>
        </section>
        </>
    )
}
