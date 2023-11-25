import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrush, faStar, faTruckFast, faShop } from "@fortawesome/free-solid-svg-icons";
export const IconsFooter = () => {
    return (
        <>
            <section className=" d-flex justify-content-around flex-wrap border text-dark text-center p-3 mt-5">
                <div> 
                <FontAwesomeIcon  icon={faTruckFast} className="text-warning " size="4x" />
                <h6 className="mt-3 "><b>Envíos Rápidos!</b></h6>
                <p className="text-secondary">Cobertura en todo Chile!</p>
                </div>
                <div>
                <FontAwesomeIcon  icon={faStar} className="text-warning" size="4x" />
                <h6 className="mt-3 "><b>Excelente calidad</b></h6>
                <p className="text-secondary">Impresiones en alta calidad</p>
                </div>
                <div>
                <FontAwesomeIcon  icon={faShop} className="text-warning mx-4" size="4x" />
                <h6 className="mt-3 "><b>Compra en todo momento</b></h6>
                <p className="text-secondary">Tienda abierta las 24/7</p>
                </div>
                <div className="">
                <FontAwesomeIcon  icon={faBrush} className="text-warning" size="4x" />
                <h6 className="mt-3 "><b>Personaliza tu compra!</b></h6>
                <p className="text-secondary">Envíale un regalo a tu familia o amigos!</p>
                </div>

            </section>
        </>
    )
}
