import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "../components/home/HomePage";
import { Contact } from "../components/pages/Contact";
import { HowToBuy } from "../components/pages/HowToBuy";
import { FAQ } from "../components/pages/FAQ";
import { Navbar } from "../components/Navbar/Navbar";
import { Dashboard } from "../components/dashboard/Dashboard";
import { AddProduct } from "../components/dashboard/AddProduct";
import { AdminOrdersDatabase } from "../components/dashboard/AdminOrdersDatabase";
import { AdminOrdersInformationId } from "../components/dashboard/AdminOrdersInformationId";
import { AdminProductDatabase } from "../components/dashboard/AdminProductDatabase";
import { AdminCategoryDatabase } from "../components/dashboard/AdminCategoryDatabase";
import { Footer } from "../components/home/Footer";
import { ProductPage } from "../components/products/ProductPage";
import { useProductStore } from "../hooks/useProductStore";
import { usePaymentStore } from "../hooks/usePaymentStore";
import { useAuthStore } from "../hooks/useAuthStore";
import { useCategoryStore } from "../hooks/useCategoryStore";
import { useOrderStore } from "../hooks/useOrderStore";
import { ProductCardByCategory } from "../components/products/ProductCardByCategory";
import { Cart } from "../components/cart/Cart";
import { UserOrders } from "../components/cart/UserOrders";
import { UserOrdersPaymentId } from "../components/cart/UserOrdersPaymentId";
import { Checkout } from "../components/cart/Checkout";
import { LoginPage } from "../components/auth/LoginPage";
import { RegisterPage } from "../components/auth/RegisterPage";
import { Wrapper } from "../Wrapper";
import {SearchResults} from '../components/home/SearchResults';
import { useCartContext } from "../context/CartContext";
import axios from "axios";
export const AppRouter = () => {
  const { status, checkAuthToken, user } = useAuthStore();
  const { products, startLoadingProducts } = useProductStore();
  const { categorys, startLoadingCategory } = useCategoryStore();
  const { payments, startLoadingPayment } = usePaymentStore();
  const {orders, startLoadingOrder } = useOrderStore();


  const navigate = useNavigate();
  const { cartItems } = useCartContext();

  useEffect(() => {
    checkAuthToken();

    if (products.length === 0) {
      startLoadingProducts();
    }
    if (payments.length === 0) {
      startLoadingPayment();
    }

    if (categorys.length === 0) {
      startLoadingCategory();
    }
    if (orders.length === 0) {
      startLoadingOrder();
    }

    
  }, [products, categorys, orders]);

  const getProductByCategory = async (category, state) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/category/${category}`
    );
    state(response.data);
  };

  if (status === "checking") {
    return (
      <>
        <Navbar />
        <div className="container mt-3 authloader">
          <div className="spinner"></div>
          <div>Cargando</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Wrapper>
        <Navbar />
        <Routes>
          {/* RUTAS PUBLICAS  */}

          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/preguntas-frecuentes" element={<FAQ />} />
          <Route path="/producto/:index" element={<ProductPage />} />
          <Route path="/productos/buscador" element={<SearchResults />} />
          <Route
            path="/producto/categoria/:category"
            element={
              <ProductCardByCategory
                getProductByCategory={getProductByCategory}
              />
            }
          />
          <Route path="/como-comprar" element={<HowToBuy />} />
          <Route path="/carrito" element={<Cart />} />
          {
            (status === 'authenticated') ?
              (<>
                <Route path="/auth/iniciar-sesion" element={<Navigate to="/" />} />
                <Route path="/auth/registrarse" element={<Navigate to="/" />} />
              </>)
              :
              (<><Route path="/auth/iniciar-sesion" element={<LoginPage />} />
                <Route path="/auth/registrarse" element={<RegisterPage />} />
              </>)
          }


          {/* RUTAS DE ADMINISTRADOR */}
          {status === "authenticated" &&
            user?.roles?.name === "administrador" ? (
            <>
              <Route path="/administracion" element={<Dashboard />} />
              <Route
                path="/administracion/productos"
                element={<AdminProductDatabase />}
              />
              <Route
                path="/administracion/productos/nuevo-producto"
                element={<AddProduct />}
              />
              <Route
                path="/administracion/categorias"
                element={<AdminCategoryDatabase />}
              />
              <Route path="/administracion/pedidos" element={<AdminOrdersDatabase />}   />
              <Route path="/administracion/pedidos/:id" element={<AdminOrdersInformationId />} />
              <Route path="/mis-compras" element={<UserOrders />} />
            </>
          ) : (
            <>
              {/*  RUTAS DE USUARIO */}
              <Route path="/" element={<HomePage />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/preguntas-frecuentes" element={<FAQ />} />
              <Route path="/producto/:index" element={<ProductPage />} />
              <Route
                path="/producto/categoria/:category"
                element={
                  <ProductCardByCategory
                    getProductByCategory={getProductByCategory}
                  />
                }
              />
              <Route path="/mis-compras" element={<UserOrders />} />
              <Route path="/mis-compras/:id" element={<UserOrdersPaymentId />} />

              <Route path="/carrito" element={<Cart />} />
              {cartItems.length > 0 && (
                <Route path="/finalizar-compra" element={<Checkout />} />
              )}
            </>
          )}
        </Routes>
        <Footer />
      </Wrapper>
    </>
  );
};
