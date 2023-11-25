import React, {useEffect} from 'react'
import { useOrderStore } from "../../hooks/useOrderStore";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle, faInfoCircle, faCog, faTruck } from "@fortawesome/free-solid-svg-icons";
export const UserOrdersItem = ({order}) => {
    const { orders, activeOrder, setActiveOrder } = useOrderStore();


    let statusClass = "";
    switch (order?.status) {
        case "Sin Informar":
          statusClass = "alert alert-danger text-center p-1 mt-3";
          break;
        case "En Proceso de Confirmación":
          statusClass = "alert alert-primary text-center p-2 mt-3";
          break;
        case "En Producción":
          statusClass = "alert alert-warning text-center p-2 mt-3";
          break;
        case "En Camino":
          statusClass = "alert alert-success text-center p-2 mt-3";
          break;
        default:
          statusClass = "";
      }

const getStatusIcon = (status) => {
  switch (status) {
    case "Sin Informar":
      return <FontAwesomeIcon icon={faExclamationCircle} />;
    case "En Proceso de Confirmación":
      return <FontAwesomeIcon icon={faInfoCircle} />;
    case "En Producción":
      return <FontAwesomeIcon icon={faCog} />;
    case "En Camino":
      return <FontAwesomeIcon icon={faTruck} />;
    default:
      return null; // Si no hay estado coincidente, no se muestra ningún icono.
  }
};

const statusIcons = getStatusIcon(order?.status);


  const handleSubmit = () => {
    if (activeOrder == null || activeOrder._id !== order._id) {
        setActiveOrder(order);
    }

  }

  useEffect(() => {
    setActiveOrder(order)
  }, [orders])

    return (



        <>
            <section>
              <div
                className="card p-2 mb-3 shadow-lg border-warning w-75 container"
                key={order._id}
              >
                <div className="d-flex justify-content-between">
                 
                  <p className="text-secondary mb-5">
                    {" "}
                    Pedido realizado el: {order?.createdAt.slice(0, 10)}
                  </p>
                </div>

                <div className="text-center">
                  <p>
                    Tu pedido se entregara en:{" "}
                    <b>
                      {order?.region} - {order?.comuna} - En la calle{" "}
                      {order?.address}
                    </b>
                  </p>
                  <p>Productos: {order?.details.map((detail) => detail + " ")}</p>
                  <p>
                    Total: <b className="text-success">${order?.totalPrice} </b>
                    CLP
                  </p>
                </div>
                <div  className={`${statusClass}`}>
                <b>
                    Estado:{" "}
                      <span>{statusIcons}</span> {order?.status.toUpperCase()}
                    </b>
                      {order?.status === "En Camino" ? (
                        <div className="mt-3">
                          <p className="text-dark"><b>Sigue tu compra en </b><br /><a href="https://www.starken.cl" target="_blank">https://www.starken.cl/</a> </p>
                      <b>Nº de seguimiento: {order?.trackingCode}</b>
                        </div>
                        
                      ) : null}
                </div>
                <div className="d-flex justify-content-end">
                    <Link to={`/mis-compras/${order._id}`} className="text-decoration-none" >
                  <button className="btn btn-success" onClick={handleSubmit}>
                    <b>Pagar y informar pago</b>
                  </button>
                    </Link>
                </div>
              </div>

            </section>

        </>
    )
}
