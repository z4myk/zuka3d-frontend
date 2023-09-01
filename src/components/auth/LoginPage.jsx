import React, {useEffect} from 'react'
import zukalogo from '../../assets/zukalogo.png'
import {Link} from 'react-router-dom'
import {useForm} from '../../hooks/useForm';
import {useAuthStore} from '../../hooks/useAuthStore';
import {useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";
const formFields = {
    loginEmail: '',
    loginPassword: '',

}
export const LoginPage = () => {

    const {loginEmail, loginPassword, onInputChange, formState} = useForm(formFields);
    const navigate = useNavigate();
    const {startLogin, errorMessage, user, status} = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
        await startLogin({ email: loginEmail, password: loginPassword });
        console.log(startLogin)
            navigate('/');
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error de credenciales',
            text: 'Por favor, verifica tu email y contraseña.',
          });
          console.log(error);
        }
      };
    

console.log(user)


    useEffect(() => {
        if (errorMessage !== undefined) {
          Swal.fire('Error en la autenticación', errorMessage, 'error');
        }
      }, [errorMessage])
    return (
        <>
            <section className="container shadow-lg text-dark card loginCard mt-3">
                <div className="text-center">
                    <img src={zukalogo} alt="Zuka logotipo" className="w-50" /> 
                </div>
                <div className="container d-flex justify-content-center">
                <form className=" p-1" autoComplete="off" onSubmit={handleLogin}>
                    <div className="">
                        <label className="mx-2 mb-1 form-label">Email <span className="text-danger">*</span></label>
                        <input type="email" placeholder="Ingrese su email" name="loginEmail" value={loginEmail} onChange={onInputChange} className="form-control   " />
                    </div>
                    <div className="mt-2">
                        <label className="mx-2 mb-1 form-label">Contraseña <span className="text-danger">*</span></label>
                        <input type="password" placeholder="Ingrese su contraseña" name="loginPassword" value={loginPassword} onChange={onInputChange}className="form-control   " />
                    </div>

                    <button className="btn btn-light text-light w-100 mt-2">Iniciar Sesión</button>
                    <div className="mt-3 ">
              <Link className="text-center text-decoration-none mx-5" to='/auth/registrarse'><b>Crear una cuenta en zuka.cl</b></Link>
            </div>
                </form>
                </div>
            </section>
        </>
    )
}
