import React from 'react'
import zukalogo from '../../assets/zukalogo.png'
import {Link} from 'react-router-dom'
export const RegisterPage = () => {
    return (
        <>
        <section className="container shadow-lg text-dark card">
        <div className="text-center">
            <img src={zukalogo} alt="Zuka logotipo" className="w-50" /> 
        </div>
        <div className="container d-flex justify-content-center">
        <form className=" p-1">
            <div className="">
                <label className="mx-2 mb-1 form-label">Email <span className="text-danger">*</span></label>
                <input type="email" placeholder="Ingrese su email" className="form-control   " />
            </div>
            <div className="mt-2">
                <label className="mx-2 mb-1 form-label">Contraseña <span className="text-danger">*</span></label>
                <input type="password" placeholder="******" className="form-control   " />
            </div>
            <div className="mt-2">
                <label className="mx-2 mb-1 form-label">Repetir contraseña <span className="text-danger">*</span></label>
                <input type="password" placeholder="******" className="form-control   " />
            </div>

            <button className="btn btn-warning text-light w-100 mt-2">Registrarse</button>
            <div className="mt-3 ">
      <Link className="text-center text-decoration-none mx-5" to='/auth/iniciar-sesion'><b>Iniciar Sesión en zuka.cl</b></Link>
    </div>
        </form>
        </div>
    </section>
        </>
    )
}
