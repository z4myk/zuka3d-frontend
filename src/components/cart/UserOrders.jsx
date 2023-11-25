import React from "react";
import { useOrderStore } from "../../hooks/useOrderStore";
import { useAuthStore } from "../../hooks/useAuthStore";
import {UserOrdersItem} from '../cart/UserOrdersItem';



export const UserOrders = () => {
  const { orders, activeOrders, setActiveOrder } = useOrderStore();
  const { user } = useAuthStore();
  const filterOrders = orders.filter((order) => order.email === user.email);

  return (
    <>
     <marquee className="bg-warning  text-light w-100 p-2"> <b className="">🛒 ENVIOS GRATIS A TODO EL PAIS POR COMPRAS SUPERIOR A $60.000 COBERTURA EN TODO CHILE!</b> </marquee>
      <section className="text-dark container mt-4">
        <h2 className="text-center">Mis Pedidos</h2>
        <hr />
        <div className="alert alert-warning text-center">
          Solo se muestran los pedidos de los últimos 2 meses.
        </div>
        {filterOrders ? filterOrders.map(order => (
            <UserOrdersItem order={order} />
        )).reverse() : (
          <>
          <p className="text-center text-dark">No se encuentran pedidos realizados.</p>
          </>
        )}
      </section>
    </>
  );
};
