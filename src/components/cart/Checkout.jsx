import React, { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useForm } from "../../hooks/useForm";
import {useAuthStore} from '../../hooks/useAuthStore';
import {useOrderStore} from '../../hooks/useOrderStore';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
const formFields = {
  name: "",
  lastname: "",
  country: "Chile",
  address: "",
  region: "",
  comuna: "",
  phone: "",
  rut: "",
  email: "",
  totalPrice: "",
  details: "",
  selectedAccesories: "",
  trackingCode: "No disponible",
  status: "Sin Informar",
  terms: false,

};
export const Checkout = () => {
  const region = [
    "Aisén del General Carlos Ibañez del Campo",
    "Antofagasta",
    "Arica y Parinacota",
    "La Aracaunía",
    "Atacama",
    "Biobío",
    "Coquimbo",
    "Libertador General Bernardo O´Higgins",
    "Los Lagos",
    "Los Ríos",
    "Magallanes",
    "Maule",
    "Ñuble",
    "Región Metropolitana de Santiago",
    "Tarapacá",
    "Valparaíso",
  ];
  
  const comuna = [
    "Alhué",
    "Bulnes",
    "Buín",
    "Chillán",
    "Calera de Tango",
    "Cerro Navia",
    "Colina",
    "Conchalí",
    "Curacaví",
    "Chillán Viejo",
    "Cerrillos",
    "Cobquecura",
    "Coelemu",
    "Coihueco",
    "El Bosque",
    "El Monte",
    "Estación Central",
    "El Carmen",
    "Huechuraba",
    "Independencia",
    "Isla de Maipo",
    "La Cisterna",
    "La Florida",
    "La Granja",
    "La Pintana",
    "La Reina",
    "Lampa",
    "Las Condes",
    "Lo Bernechea",
    "Lo Espejo",
    "Lo Prado",
    "Ninhue",
    "Macul",
    "Maipú",
    "María Pinto",
    "Melipilla",
    "Ñuñoa",
    "Ñiquén",
    "Pemuco",
    "Padre Hurtado",
    "Paine",
    "Pedro Aguirre Cerda",
    "Peñaflor",
    "Peñalolén",
    "Pirque",
    "Providencia",
    "Pudahuel",
    "Puente Alto",
    "Pinto",
    "Portezuelo",
    "Qilicura",
    "Quinta Normal",
    "Quillón",
    "Quirihue",
    "Recoleta",
    "Renca",
    "Ranqui",
    "San Bernardo",
    "San Joaquín",
    "San Jose de Maipo",
    "San Miguel",
    "San Pedro",
    "San Ramón",
    "Santiago",
    "San Carlos",
    "San Fabián de Alico",
    "San Ignacio",
    "San Nicolás",
    "Tregueco",
    "Talagante",
    "Tiltil",
    "Vitacura",
    "Yungay",
  ];

  
  
  const { cartItems, getTotalPrice} = useCartContext();
  const { status, checkAuthToken, user } = useAuthStore();
  const { startSavingOrders } = useOrderStore();
  // const shippingCost = cartItems.length >= 2 || cartItems[0].quantity >= 2 ? 9000 : 7000;
  const userEmail = user.email;
  const URL = import.meta.env.VITE_API_URL;
 const navigate = useNavigate();
  const { onInputChange, formState, onResetForm } = useForm(formFields);
  
  function calculateTotalItems(cartItems) {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  function calculateShippingCost(cartItems) {
    if (cartItems.length === 0) {
      return 7000; // Costo base si el carrito está vacío
    }
    const totalItems = calculateTotalItems(cartItems);
  

    if (totalItems === 1) {
      return 7000;
    } else if (totalItems === 2) {
      return 9000;
    } else if (totalItems >= 3) {
      return 11000;
    }
    return 7000; // Redundante pero asegura cobertura
  }

  const shippingCost = calculateShippingCost(cartItems);
  


  const calculateTotalPrice = () => {
    const lastTotalPrice = getTotalPrice() >= 120000 ? getTotalPrice() : getTotalPrice() + shippingCost;
    return lastTotalPrice;
  };
  
  const calculateDetails = () => {
    const totalDetails = cartItems.map((items) => (items.name + " " + "X" + items.quantity ))
    return totalDetails;
  };

  const calculateAccesories = () => {
    const accesories = cartItems.map((item) => item.selectedAccessories)
    return accesories;

  }

  const clearShopInformationAndRedirect = () => {
    navigate("/mis-compras");
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }
  
  const formData = {
    name: formState.name,
    lastname: formState.lastname,
    country: formState.country,
    address: formState.address,
    region: formState.region,
    comuna: formState.comuna,
    phone: formState.phone,
    email: userEmail,
    rut: formState.rut,
    status: formState.status,
    terms: formState.terms,
    selectedAccesories: calculateAccesories(),
    trackingCode: formState.trackingCode,
    totalPrice: calculateTotalPrice(),
    details: calculateDetails(),
  };

  

    const handleCheckboxChange = (event) => {
      const { name, checked } = event.target;
      onInputChange({ target: { name, value: checked } }); 
    };
    

    
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      
      
      try{
        const res = await axios.post(`${URL}/orders`, formData)
        console.log(res)
        if (res && res.status) {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "El pedido fue realizado con éxito!",
              showConfirmButton: false,
              timer: 1500,
            });
            setTimeout(() => {
              clearShopInformationAndRedirect();
            }, 2000)
          }
        }
      }catch(error){
          console.log(error)
      }
    }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="row text-dark mx-4 container ">
          <div className="col-sm-12 col-md-6 ">
            <h3 className="text-center mb-4 mt-4">
              <b>Facturación y envío</b>
              <hr />
            </h3>

            <div className="d-flex justify-content-between">
              <div className="mb-3">
                <label>
                  Nombre <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  className="w-100 mb-2 form-control border-dark"
                  onChange={onInputChange}
                  value={formState.name}
                  required
                />
              </div>
              <div>
                <label>
                  Apellido <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Apellido"
                  name="lastname"
                  className="w-100  form-control border-dark"
                  onChange={onInputChange}
                  value={formState.lastname}
                  required
                />
              </div>
            </div>
            <div>
              <label>
                País / Regíon <span className="text-danger">*</span>
              </label>
              <p>
                {" "}
                <b>Chile</b>
              </p>
            </div>
            <div className="mb-2">
              <label>
                Direccíon de la calle<span className="text-danger"> *</span>
              </label>
              <input
                className="form-control border-dark"
                type="text"
                placeholder="Número de la casa y nombre de la calle"
                name="address"
                onChange={onInputChange}
                value={formState.address}
                required
              />
            </div>
            <div>
              <label>
                Región<span className="text-danger"> *</span>
              </label>
              <select
                className="form-select border-dark"
                aria-label="Default select example"
                onChange={onInputChange}
                value={formState.region}
                name="region"
              >
                <option selected>Seleccione una región</option>
                {region.map((reg) => (
                  <option key={reg}>{reg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mt-2">
                Comuna<span className="text-danger"> *</span>
              </label>
              <select
                className="form-select border-dark"
                aria-label="Default select example"
                onChange={onInputChange}
                value={formState.comuna}
                name="comuna"
              >
                <option selected>Seleccione una comuna</option>
                {comuna.map((com) => (
                  <option key={com}>{com}</option>
                ))}
              </select>
            </div>
            <div className="mt-2">
              <label>
                Telefono<span className="text-danger"> *</span>
              </label>
              <input
                type="number"
                className="form-control border-dark"
                name="phone"
                onChange={onInputChange}
                value={formState.phone}
              />
            </div>

            <div className="mt-2">
              <label>
                Dirección de correo electrónico
                <span className="text-danger"> *</span>
              </label>
              <input
                type="email"
                className="form-control border-dark"
                name="email"
                placeholder="example@example.com"
                onChange={onInputChange}
                value={userEmail}
                disabled
              />
            </div>

            <div className="mt-2">
              <label>
                Rut<span className="text-danger"> *</span>
              </label>
              <input
                type="text"
                className="form-control border-dark"
                name="rut"
                placeholder="ingrese rut"
                onChange={onInputChange}
                value={formState.rut}
              />
            </div>
          </div>

          <div className="col-sm-12 col-md-6 ">
            <h3 className="text-center mt-4">
              <b>Tu pedido</b>
              <hr />
            </h3>
            <div className="p-2 w-100">
              <table className="table table-light table-hover table-responsive text-light container">
                <thead>
                  <tr className="border text-center">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {cartItems.map((items) => (
                    <tr className="border" key={items._id}>
                      <td>{items?.selectedAccessories.length === 0 ? items.name : `${items.name} + ${items.selectedAccessories} Accesorios` }</td>
                      <td>{items.quantity}</td>
                      <td>${items.price * items.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="d-flex justify-content-evenly bg-light pt-2 border">
                <b className="">Costo de envío:</b>
                <p>
                  <b 
                        className={
                          getTotalPrice() >= 120000
                            ? "text-success"
                            : "text-dark"
                        }
                      >
                        {getTotalPrice() >= 120000 ? (
                          <b className="">Gratis</b>
                        ) : (
                          <b>${shippingCost}</b>
                        )}
                      
                  </b>
                </p>
              </div>
              <div className="d-flex justify-content-evenly  bg-light pt-2 border">
                <b className="">Total a pagar:</b>
                <p>
                  <b className="text-success">
                  ${calculateTotalPrice()}
                  </b>
                </p>
              </div>
              <div className="bg-light p-3 border mt-3">
                <p className="text-center">
                  <b>
                    Sus datos personales se utilizarán para procesar su pedido,
                    respaldar su experiencia en este sitio web y para otros
                    fines descritos en nuestra{" "}
                    <span className="text-danger">Política de Privacidad</span>.
                  </b>
                </p>
                <hr />
                {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="terms"
                    value={formState.terms}
                    checked={formState.terms}
                    onChange={handleCheckboxChange}
                    id="flexCheckDefault"
                    required
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    He leído y estoy de acuerdo con los{" "}
                    <b className="text-danger">términos y condiciones</b> de la
                    web <span className="text-danger">*</span>
                  </label>
                </div> */}
              </div>
              <button className="btn btn-success w-100 mt-1" type="submit">
                <b>Realizar Pedido</b>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
