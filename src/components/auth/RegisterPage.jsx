import React, {useEffect} from 'react'
import zukalogo from '../../assets/zukalogo.png'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/useForm';
import {useAuthStore} from '../../hooks/useAuthStore';
import Swal from "sweetalert2";
const formFields = {
    email: '',
    password: '',
    validPassword: '',
};


export const RegisterPage = () => {
    
    const {email, password, validPassword, onInputChange, formState} = useForm(formFields)
    const {startRegister, errorMessage} = useAuthStore();
    
 
    const handleRegister = async(e) => {
        e.preventDefault();
        
        if(password !== validPassword){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error",
                text: "¡Las contraseñas no coinciden!",
                showConfirmButton: false,
                timer: 1500,
              });
              return;
        }
        try{
            const response = await startRegister(formState);
            if (response && response.status) {
                if (response.status === 200 || response.status === 201) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "La cuenta fue registrada con exito!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              }
        }catch(error){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Error de credenciales",
                text: "Por favor, verifica tu email y contraseña.",
                showConfirmButton: false,
                timer: 1500,
              });
            console.log(error)
        }

    }

    useEffect(() => {
        if (errorMessage !== undefined) {
          Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
      }, [errorMessage])

    return (
        <>
        <section className="container shadow-lg text-dark pb-3 card">
        <div className="text-center">
            <img src={zukalogo} alt="Zuka logotipo" className="w-50" /> 
        </div>
        <div className="container d-flex justify-content-center">
        <form className=" p-1" onSubmit={handleRegister}>
            <div className="">
                <label className="mx-2 mb-1 form-label">Email <span className="text-danger">*</span></label>
                <input type="email" placeholder="Ingrese su email" onChange={onInputChange} name="email" value={email} className="form-control   " />
            </div>
            <div className="mt-2">
                <label className="mx-2 mb-1 form-label">Contraseña <span className="text-danger">*</span></label>
                <input type="password" name="password" value={password} onChange={onInputChange} placeholder="******" className="form-control   " />
            </div>
            <div className="mt-2">
                <label className="mx-2 mb-1 form-label">Repetir contraseña <span className="text-danger">*</span></label>
                <input type="password" name="validPassword" value={validPassword} onChange={onInputChange} placeholder="******" className="form-control   " />
            </div>

            <button className="btn btn-warning text-light w-100 mt-2" type="submit">Registrarse</button>
            <div className="mt-3 ">
      <Link className="text-center text-decoration-none mx-5" to='/auth/iniciar-sesion'><b>Iniciar Sesión en zuka3d.cl</b></Link>
    </div>
        </form>
        </div>
    </section>
        </>
    )
}
