import React from 'react'
import zukalogo from '../../assets/zukalogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faFacebook,
  } from "@fortawesome/free-brands-svg-icons";
export const HowToBuy = () => {
    return (
        <>
            <section className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-4">
                        <img src={zukalogo} className="w-100"/>
                        <hr className="text-warning" />
                        <div className="d-flex justify-content-center gap-3">
                            <FontAwesomeIcon icon={faInstagram} size="2x" className="text-danger" />
                            <FontAwesomeIcon icon={faFacebook}  size="2x" className="text-primary" />
                        </div>
                       
                            <p className="text-dark text-center mt-3 "><b>E-mail: contacto@zuka3d.cl</b></p>

                    </div>
                    <div className="col-sm-12 col-md-8  text-dark">
                        <h3 className="text-center"><b>¿Cómo Comprar?</b></h3>
                        <div className="bg-warning p-2 mb-3"></div>
                        <ol>
                            <li>Elige los productos que te interesen y <b>añádelos al carro 💪</b>.</li>
                            <li>Ve al <b>carrito de compra</b> y verifica que los productos escogidos sean los correctos. ✨</li>
                            <li>Selecciona <b>Continuar pedido</b>.</li>
                            <li>Completa los datos de <b>facturación y envío</b>. </li>
                            <li>Realiza la compra mediante <b>depósito o transferencia bancaria</b>.</li>
                            <li>Finaliza el proceso <b>enviando el comprobante de depósito o transferencia</b> para actualizar el estado de tu pedido. 🚀</li>
                        </ol>
                        <p>Una vez despachados, los pedidos demoran entre 3 y 4 días hábiles. (Los envíos van a la dirección indicada y se realizan vía <b>STARKEN</b>)</p>
                    </div>
                </div>
            </section>
        </>
    )
}
