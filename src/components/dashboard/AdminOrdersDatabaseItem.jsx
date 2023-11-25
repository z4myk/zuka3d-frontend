import React, {useEffect} from 'react'
import {
    faTrashCan,
    faEye,
    faExclamationCircle, faCheckCircle, faInfoCircle, faCog, faTruck
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { useOrderStore } from "../../hooks/useOrderStore";
  import { usePaymentStore } from "../../hooks/usePaymentStore";
  import {Link} from 'react-router-dom'
  import Swal from "sweetalert2";
export const AdminOrdersDatabaseItem = ({order, payment}) => {

    let statusClass = "";
    switch (order?.status) {
        case "Sin Informar":
          statusClass = "bg-danger text-light";
          break;
        case "En Proceso de Confirmación":
          statusClass = "bg-primary text-light";
          break;
        case "En Producción":
          statusClass = "bg-warning text-dark";
          break;
        case "En Camino":
          statusClass = "bg-success text-light";
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

      const {activeOrder, setActiveOrder,startDeleteOrder } = useOrderStore();
      const {startDeletePayment, setActivePayment, activePayment} = usePaymentStore();

      let filterPay = payment.filter((pay) => pay.paymentId === order._id )

      const handleDelete = () => {
        setActiveOrder(order)
        
        console.log(filterPay[0])
        if(filterPay){
          setActivePayment(filterPay[0])
        }
      try{
        Swal.fire({
          title: '¿Estás seguro de borrar este pedido?',
          text: "esta opción no se podra revertir",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Borrar',
          cancelButtonText: 'Cancelar'
          
      }).then((result) => {
          if (result.isConfirmed) {
              startDeleteOrder(order)
              startDeletePayment(filterPay[0])
          }
      })
      }catch(error){
        console.log(error)
     
      }
      }

      const handleWatchDetails = () => {
        if (activeOrder == null || activeOrder._id !== order._id) {
            setActiveOrder(order);
        }
      }

   
      
      return (
        <>
        
                <tr >
                <td >#{order._id}</td>
                <td>{order.email}</td>
                <td><b className={` p-2 text-center ${statusClass}`}> {statusIcons} {order.status}</b></td>
                <td className="text-success"><b>${order.totalPrice}</b></td>
                <td className=""><b>{order?.date.slice(0, 10)}</b></td>
                <td className="gap-1 d-flex">
                  <Link to={`/administracion/pedidos/${order._id}`}>
                <button className=" btn btn-primary text-light" onClick={handleWatchDetails}>
                        <FontAwesomeIcon icon={faEye} />
                    </button>{" "}
                  </Link>
                    <button className="btn btn-danger" onClick={handleDelete} >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
        </>
    )
}
