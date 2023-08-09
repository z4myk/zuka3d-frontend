import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../../context/CartContext";
import {Link} from 'react-router-dom';
export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalPrice,
    incrementCart,
  } = useCartContext();

  const shippingCost = 5500;

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <>
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
            <table className="table table-light table-hover table-responsive text-light container">
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
                  {/* = o + a 30.000 Envio gratis*/}
                  {/* Envio por default $5.500 */}
                  <td
                    className={
                      getTotalPrice() >= 30000 ? "text-success" : "text-dark"
                    }
                  >
                    {getTotalPrice() >= 30000 ? (<b>Gratis</b>) : (<b>${shippingCost}</b>)}
                  </td>
                  <td>
                    <b>
                      $
                      {getTotalPrice() >= 30000
                        ? getTotalPrice()
                        : getTotalPrice() + shippingCost}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
            <Link to="/finalizar-compra" className="text-decoration-none">          
              <button className="btn btn-success p-3 px-5">
                <b>Finalizar Compra</b>
              </button>
            </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};
