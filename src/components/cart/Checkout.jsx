import React, {useState} from "react";
import { useCartContext } from "../../context/CartContext";
import {useForm} from '../../hooks/useForm';

const formFields = {
  name: '',
  surname: '',
  country: 'Chile',
  address: '',
  region: '',
  comuna: '',
  phone: '',
  email: '',
  rut: '',

}

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
    "Bulnes",
    "Chillán",
    "Chillán Viejo",
    "Cobquecura",
    "Coelemu",
    "Coihueco",
    "El Carmen",
    "Ninhue",
    "Ñiquén",
    "Pemuco",
    "Pinto",
    "Portezuelo",
    "Quillón",
    "Quirihue",
    "Ranqui",
    "San Carlos",
    "San Fabián de Alico",
    "San Ignacio",
    "San Nicolás",
    "Tregueco",
    "Yungay",
  ];
  const shippingCost = 5500;

  const { cartItems, getTotalPrice } = useCartContext();
  const {onInputChange, formState} = useForm(formFields);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  console.log(formState)
  return (
    <>
      <form>
      <div className="row text-dark mx-4 container ">
        <div className="col-sm-12 col-md-6 ">
          <h3 className="text-center mb-4">
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
                  name="surname"
                  className="w-100  form-control border-dark"
                  onChange={onInputChange}
                  value={formState.surname}
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
                value={formState.email}
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

        <div className="col-sm-12 col-md-6 mt-4">
          <h3 className="text-center">
            <b>Tu pedido</b>
            <hr />
          </h3>
          <div className="p-2 w-75">
            <table className="table table-light table-hover table-responsive text-light container ">
              <thead>
                <tr className="border">
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Envío</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((items) => (
                  <tr className="border" key={items._id}>
                    <td className="p-3">{items.name}</td>
                    <td>{items.quantity}</td>
                    <td
                      className={
                        getTotalPrice() >= 30000 ? "text-success" : "text-dark"
                      }
                    >
                      {getTotalPrice() >= 30000 ? (
                        <b>Gratis</b>
                      ) : (
                        <b>${shippingCost}</b>
                      )}
                    </td>
                    <td>${items.price * items.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-around bg-light pt-2 border">
              <b className="">Total a pagar:</b>
              <p>
                <b className="text-success">
                  $
                  {getTotalPrice() >= 30000
                    ? getTotalPrice()
                    : getTotalPrice() + shippingCost}
                </b>
              </p>
            </div>
            <div className="bg-light p-3 border mt-3">
              <p>
                <b>
                  Sus datos personales se utilizarán para procesar su pedido,
                  respaldar su experiencia en este sitio web y para otros fines
                  descritos en nuestra{" "}
                  <span className="text-danger">Política de Privacidad</span>
                </b>
              </p>
              <hr />
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  id="flexCheckDefault"
                  required
                />
                <label className="form-check-label" for="flexCheckDefault">
                  He leído y estoy de acuerdo con los{" "}
                  <b className="text-danger">términos y condiciones</b> de la
                  web <span className="text-danger">*</span>
                </label>
              </div>
            </div>
                <button className="btn btn-success w-100 mt-1" type="submit"><b>Realizar Pedido</b></button>
          </div>
        </div>
      </div>
        </form>
    </>
  );
};
