import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../context/CartContext";
import {useAuthStore} from '../../hooks/useAuthStore';
import {Link} from 'react-router-dom';
export const Cart = () => {

  const {status} = useAuthStore();
  
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    incrementCart,
  } = useCartContext();

  console.log(cartItems)
  const shippingCost = cartItems.length >= 2 || cartItems[0]?.quantity >= 2 ? 7600 : 5900;

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <>
  
     {status === "authenticated" ? (
          <span></span>
          ) : (
            <div className="alert alert-danger text-center">Debes iniciar sesión para continuar con la compra.</div>
        )}
      <div className="container text-dark">
        <h3>
          <b>Carrito</b>
        </h3>
        <hr />
        {cartItems.length === 0 ? (
          <div class="alert alert-danger" role="alert">
            El carrito de compras se encuentra vacío
          </div>
        ) : (
          <>
          <div className="table-responsive">
            <table className="table table-light table-hover text-light container">
              <thead>
                <tr className="">
                  <th>Eliminar</th>
                  <th></th>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((items) => (
                  <tr className="border" key={items._id}>
                    <td className="d-flex gap-1">
                      <br />{" "}
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveFromCart(items._id)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                    <td>
                      <img src={items.imageURL} className="imageCart" />
                    </td>
                    <td>{items.name}</td>
                    <td>${items.price}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary mx-2 buttonRoundedCart"
                        onClick={() => removeFromCart(items._id)}
                      >
                        <b>-</b>
                      </button>
                      {items.quantity}
                      <button
                        className="btn btn-outline-secondary mx-2 buttonRoundedCart"
                        onClick={() => incrementCart(items._id)}
                      >
                        <b>+</b>
                      </button>
                    </td>
                    <td>${items.price * items.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-5">
              <b>Total del carrito</b>
            </h3>
            <hr />
            <div className="table-responsive">
            <table class="table border">
              <thead>
                <tr>
                  <th scope="col">Subtotal</th>
                  <th scope="col">Envio por Starken</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="col">${getTotalPrice()}</th>
                  <td
                    className={
                      getTotalPrice() >= 60000 ? "text-success" : "text-dark"
                    }
                  >
                    {getTotalPrice() >= 60000 ? (<b>Gratis</b>) : (<b>${shippingCost}</b>)}
                  </td>
                  <td>
                    <b>
                      $
                      {getTotalPrice() >= 60000
                        ? getTotalPrice()
                        : getTotalPrice() + shippingCost}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <div className="d-flex justify-content-end">
            {status === "authenticated" ? (
              
              <Link to="/finalizar-compra" className="text-decoration-none"> 
              <button className="btn btn-success p-3 px-5">
                <b>Continuar Pedido</b>
              </button>
            </Link>
              ) : (
                <button className="btn btn-success p-3 px-5 disabled ">Continuar Pedido</button>
              )}         
             
            </div>
            </div>
          </>
        )}
      </div>

    </>
  );
};
