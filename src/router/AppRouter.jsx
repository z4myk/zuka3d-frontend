import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {HomePage} from '../components/home/HomePage'
import {Contact} from '../components/pages/Contact'
import {FAQ} from '../components/pages/FAQ'
import {Navbar} from '../components/Navbar/Navbar'
import {Dashboard} from '../components/dashboard/Dashboard'
import {AddProduct} from '../components/dashboard/AddProduct'
import {AdminProductDatabase} from '../components/dashboard/AdminProductDatabase'
import {AdminCategoryDatabase} from '../components/dashboard/AdminCategoryDatabase';
import {Footer} from '../components/home/Footer'
import {ProductPage} from '../components/products/ProductPage';
import {useProductStore} from '../hooks/useProductStore';
import {useCategoryStore} from '../hooks/useCategoryStore';
import {ProductCardByCategory} from '../components/products/ProductCardByCategory';
import {Cart} from '../components/cart/Cart';
import {Checkout} from '../components/cart/Checkout';
import {LoginPage} from '../components/auth/LoginPage';
import {RegisterPage} from '../components/auth/RegisterPage';
import {Wrapper} from '../Wrapper';
import {useCartContext} from '../context/CartContext';
import axios from 'axios'
export const AppRouter = () => {

    const {products, startLoadingProducts} = useProductStore();
    const {categorys, startLoadingCategory} = useCategoryStore();

    const navigate = useNavigate();
    const {cartItems} = useCartContext();


    useEffect(() => {
        if(products.length === 0){
            startLoadingProducts();
        }

        if(categorys.length === 0){
            startLoadingCategory();
        }

    }, [products, categorys])

    const getProductByCategory = async (category, state) => {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${category}`)
        state(response.data)
    }

    

    

    return (
        <>
        <Wrapper>
        <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/contacto" element={<Contact />}/>
                <Route path="/preguntas-frecuentes" element={<FAQ />}/>
                <Route path="/producto/:index" element={<ProductPage />}   />
                <Route path="/producto/categoria/:category" element={<ProductCardByCategory getProductByCategory={getProductByCategory} />} />

                <Route path="/auth/iniciar-sesion"  element={<LoginPage />} />
                <Route path="/auth/registrarse" element={<RegisterPage />} />
                {
                    cartItems.length === 0 ? (
                        <Route path="/carrito" element={<Cart />}/>     

                    ) : (
                        <>
                        <Route path="/carrito" element={<Cart />}/> 
                        <Route path="/finalizar-compra" element={<Checkout />} />
                        </>
                    )
                }
                <Route path="/administracion" element={<Dashboard />}/>
                <Route path="/administracion/productos" element={<AdminProductDatabase />} />
                <Route path="/administracion/productos/nuevo-producto" element={<AddProduct />}/>
                <Route path="/administracion/categorias" element={<AdminCategoryDatabase />} />
            </Routes>
            <Footer />
            </Wrapper>
        </>
    )
}