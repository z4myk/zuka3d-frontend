import React, {useEffect, useState} from "react";
import { AdminOrdersDatabaseItem } from "./AdminOrdersDatabaseItem";
import { useOrderStore } from "../../hooks/useOrderStore";
import { usePaymentStore } from "../../hooks/usePaymentStore";
import { useCounter } from "../../hooks/useCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Pagination} from '../home/Pagination';
import {
 faChartColumn,
  faDollarSign,
  faCircleExclamation,
  faCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import{Link} from 'react-router-dom'
export const AdminOrdersDatabase = () => {


  const { orders} = useOrderStore();
  const { payments} = usePaymentStore();
  const { counter, decrement, increment, reset } = useCounter(1);
  const maxOrders = 20;
  const lastPage = Math.ceil(orders?.length / maxOrders);

  const [gameSearch, setGameSearch] = useState('');
  const [elementSearch, setElementSearch] = useState([])



  const getSearchData = () => {
    const filterData = orders.filter((order) => order.email.toLowerCase().includes(gameSearch.toLowerCase())).reverse();
    if (gameSearch.trim() === '') {
      setElementSearch(orders);
    } else {
      setElementSearch(filterData)
    }
  }
     
     useEffect(() => {
       getSearchData();
     }, [orders, gameSearch])


  const ordersNotWarned = orders.filter(
    (order) => order?.status === "Sin Informar"
  );

  const ordersBalance = orders.filter(
      (order) => order.status === "En Camino" && "Completado"
      );
      
  const getTotalPriceForCurrentMonth = () => {
    // Obtén el mes actual (0 = enero, 1 = febrero, ..., 11 = diciembre)
    const currentMonth = new Date().getMonth();
    // Filtra los pedidos que estan en "En Proceso de Confirmación" y tienen el mismo mes
    const filteredOrders = ordersBalance.filter((order) => {
      const orderMonth = new Date(order.date).getMonth();
      return orderMonth === currentMonth;
    });

    // Calcula el total de dinero ganado
    return filteredOrders.reduce((total, item) => total + item.totalPrice, 0);
  };
  const currentMonth = new Date().getMonth();
  const totalMoneyForCurrentMonth = getTotalPriceForCurrentMonth();
 

  return (
    <>
     <Link to="/administracion">
          <button className="btn btn-outline-warning border-2 mx-5 mb-4">
            <FontAwesomeIcon icon={faCircleLeft}  /> Volver atrás
          </button>
        </Link>
      <h3 className="text-dark text-center mb-2">Pedidos</h3>
      <hr className="text-dark container mb-5" />
      <section className="container text-dark d-flex justify-content-around gap-3">
        <div className=" shadow-lg p-3 card text-center">
            <FontAwesomeIcon icon={faDollarSign} className="text-success mb-2" size="2x"/>
          <p>
            <b>Balance de este mes:</b>
          </p>
          <p className="text-center text-success">
            <b>${totalMoneyForCurrentMonth} CLP</b>
          </p>
        </div>

        <div className=" shadow-lg p-3 card text-center">
        <FontAwesomeIcon icon={faChartColumn} className="text-info mb-2" size="2x" />
          <p>
            <b>Pedidos recibidos:</b>
          </p>
          <p className="text-center text-dark">
            {" "}
            <b>{orders?.length}</b>
          </p>
        </div>
        <div className=" shadow-lg p-3 card text-center">
            <FontAwesomeIcon icon={faCircleExclamation} className="text-danger mb-2" size="2x" />
          <p>
            <b>Pedidos sin Informar:</b>
          </p>
          <p className="text-center text-danger">
            {" "}
            <b>{ordersNotWarned?.length}</b>
          </p>
        </div>
      </section>
        <input className="form-control mt-4 container" placeholder="ingrese email para buscar un pedido en particular..." value={gameSearch}
            name="search"
            onChange={(e) => setGameSearch(e.target.value)} />
      <section className="mt-5 table-responsive">
        <table className="table table-light table-hover  text-light container">
          <thead>
            <tr className="">
              <th>ID</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
          {elementSearch?.slice(
            (counter - 1) * maxOrders,
            (counter - 1) * maxOrders + maxOrders
          ).map((order) => (
            <AdminOrdersDatabaseItem key={order._id} order={order} payment={payments} />

          )).reverse()}
          </tbody>
        </table>
        <Pagination 
            page={counter}
            decrement={decrement}
            increment={increment}
            lastPage={lastPage}
            />
      </section>
    </>
  );
};
