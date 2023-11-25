import React, { useEffect, useState } from "react";
import { useOrderStore } from "../../hooks/useOrderStore";
import { usePaymentStore } from "../../hooks/usePaymentStore";
import { useForm } from "../../hooks/useForm";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
export const AdminOrdersInformationId = () => {

  const navigate = useNavigate();
  const params = useParams();
  const {
    orders,
    setActiveOrder,
    activeOrder,
    startSavingOrders,
  } = useOrderStore();
  const { payments} = usePaymentStore();

  const URL = import.meta.env.VITE_API_URL;

  const [formValues, setFormValues] = useState({
    status: "",
    trackingCode: "",
  });

  const statusData = [
    "Sin Informar",
    "En Proceso de Confirmación",
    "En Producción",
    "En Camino",
    "Completado",
  ];
  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  console.log(formValues);

  const payInformation = payments.filter(
    (payment) => payment.paymentId === activeOrder._id
  );

  useEffect(() => {
    if (activeOrder == null && orders.length > 0) {
      const { 0: orders } = orders.filter((order) => order._id === params._id);
      setActiveOrder(order);
    }
  }, [orders, activeOrder, params._id]);

  useEffect(() => {
    if (activeOrder !== null) {
      setFormValues({ ...activeOrder });
    }
  }, [activeOrder]);


 
  const redirect = () => {
    navigate('/administracion/pedidos')
    window.location.reload();
    
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${URL}/orders/${activeOrder._id}`, {
        status: formValues.status,
        trackingCode: formValues.trackingCode,
      });
      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "El estado del pedido fue editado con exito!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          redirect()
        }, 1000)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="text-dark container text-center">
        <div className="row">
          <Link to="/administracion/pedidos" className="text-decoration-none">
            <button className="  btn btn-warning text-light w-100">
              Volver atrás
            </button>
          </Link>
          <div className="col-sm-12 col-md-4">
            <div className=" w-100 p-3 border text-dark shadow-lg">
              <div>
                <div>
                  <h3 className=" bg-dark text-light p-2">
                    Detalles del cliente
                  </h3>
                  <hr />
                  <p>
                    Nombre completo:{" "}
                    <b>
                      {activeOrder?.name} {activeOrder?.lastname}
                    </b>
                  </p>
                  <p>
                    Telefono: <b>{activeOrder?.phone}</b>
                  </p>
                  <p>
                    Email: <b>{activeOrder?.email}</b>
                  </p>
                  <p>
                    RUT: <b>{activeOrder?.rut}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-primary w-100 p-3 text-light">
              <p>
                <b>Estado del pedido: {activeOrder?.status}</b>
              </p>
            </div>
            <div>
              <form>
                <label className="form-label mt-3 bg-dark p-2 text-light w-100">
                  Actualizar estado del pedido
                </label>
                <select
                  className="form-select"
                  onChange={onInputChange}
                  name="status"
                  value={formValues.status}
                >
                  
                  {statusData.map((status) => (
                    <option >{status}</option>
                  ))}
                </select>
                <label className=" mt-2 form-label bg-dark p-2 text-light w-100" >Ingresar codigo de seguimiento</label>
                <input className="form-control" type="text" name="trackingCode" value={formValues.trackingCode} placeholder="Ingrese codigo de tracking" onChange={onInputChange} />  
                <button
                  className="btn btn-success w-100 mt-1"
                  onClick={handleSave}
                >
                  Actualizar
                </button>
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-8 ">
            <div className="border p-2 shadow-lg">
              <div>
                <h3 className=" bg-dark text-light p-2">Facturación y envío</h3>
                <hr />
                <p>
                  Pais: <b>{activeOrder?.country}</b>
                </p>
                <p>
                  Región: <b>{activeOrder?.region}</b>
                </p>
                <p>
                  Comuna: <b>{activeOrder?.comuna}</b>
                </p>
                <p>
                  Dirección: <b>{activeOrder?.address}</b>
                </p>
                <p>
                  Total:{" "}
                  <b className="text-success">${activeOrder?.totalPrice} CLP</b>
                </p>
                <p>
                  Productos:{" "}
                  <b>{activeOrder?.details.map((detail) => detail + " ")}</b>
                </p>
              </div>
              <div>
                <h3 className="mt-3 bg-dark text-light p-2 w-100">
                  Informe de pago
                </h3>
                <hr />
                {payInformation !== null ? (
                  payInformation.map((pay) => (
                    <div>
                      <p>Fecha de informe: {pay.date.slice(0, 10)}</p>
                      <p>
                        nombre de Banco / Caja vecina: <b>{pay.bank}</b>
                      </p>
                      <p>
                        Numero de comprobante / operación:{" "}
                        <b>{pay.numberOperation}</b>
                      </p>
                      <p>
                        Monto Transferido:{" "}
                        <b className="text-success">${pay.transferred}</b>
                      </p>
                      <p>
                        Comentario: <b>{pay.comments}</b>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-warning p-3">
                    <p className="text-dark">
                      El cliente no ingreso un informe de pago todavía
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
