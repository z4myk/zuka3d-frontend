import React from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {ProductItem} from '../products/ProductItem';
import {IconsFooter} from '../home/IconsFooter';
import zukalogo from '../../assets/zukalogo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCartContext } from "../../context/CartContext";
import {Link} from 'react-router-dom'
import carita from '../../assets/carita.png'
import {
    faMagnifyingGlass,
  } from "@fortawesome/free-solid-svg-icons";

import {
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export const HomePage = () => {
  const {inputSearch, setInputSearch, getSearchProduct} = useCartContext();
  const {products} = useProductStore();


    return (
      <>
        <marquee className="bg-warning  text-light w-100 p-2"> <b className="">🛒ENVIOS GRATIS A TODO EL PAIS POR COMPRAS SUPERIORES A $120.000 COBERTURA EN TODO CHILE! </b> </marquee>
      
        <div className="container">
            <div className="text-center">
            <img src={zukalogo} className="w-50 " />
            </div>
            <div className="d-flex mb-4">
              <input
                className="form-control me-1 "
                placeholder="Buscar producto..."
                name={inputSearch}
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
              />
              <Link to="/productos/buscador">
              <button className="btn btn-outline-warning" type="submit"  onClick={getSearchProduct}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
              </Link>
            </div>

            <h4 className="text-dark mt-5">Ultimos productos agregados</h4>
            <hr className="text-dark mb-5" />
        
            <section className=" d-flex justify-content-around flex-wrap ">
            {/* <ProductCard /> */}
            <ProductItem product={products} />
            </section>
            <h3 className="text-center text-dark mt-5">¡nuestra agenda está abierta para personalizar Funkos especialmente para mamá! 🎉</h3>
            <p className="text-center text-dark">Si quieres agendar tu Funko personalizado para Mayo, escríbenos a 
            <b> contacto@zuka3d.cl</b></p>
<div className="text-center">
<img src={carita} alt="emoji cara triste" />
</div>
            <IconsFooter />

        </div>
        <a href="https://wa.me/56921983534" target="_blank">
        <div className="floating-button">
        <button className="btn btn-success rounded-5 p-2">
        <FontAwesomeIcon icon={faWhatsapp} size="3x " clasName="btn-whatsapp" />
        </button>
        </div>
        </a>
        </>
    )
}
