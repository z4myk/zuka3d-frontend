import React, {useEffect} from 'react'
import {useOrderStore} from '../../hooks/useOrderStore';
import {useAuthStore} from '../../hooks/useAuthStore';
import {useForm} from '../../hooks/useForm';
import {useParams, useNavigate} from 'react-router-dom'
import bancoestado from '../../assets/bancoestado.png'
import axios from 'axios'
import Swal from 'sweetalert2'
const formFields = {
    bank: "",
    numberOperation: "",
    comments: "",
    paymentMethod: "",
    transferred: "",
    paymentId: "",

}
export const UserOrdersPaymentId = () => {
    
    const params = useParams();
    const navigate = useNavigate();
    const { orders, setActiveOrder, activeOrder } = useOrderStore();
    const URL = import.meta.env.VITE_API_URL;
    const paymentAd = activeOrder?._id;
    const transferredAd = activeOrder?.totalPrice  + " " + "CLP";
    const {formState, onInputChange, onResetForm} = useForm(formFields);

    const clearShopInformationAndRedirect = () => {
        navigate("/mis-compras");
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      }

    const formData = {
        bank: formState.bank,
    numberOperation: formState.numberOperation,
    comments: formState.comments,
    paymentMethod: formState.paymentMethod,
    transferred: transferredAd,
    paymentId: paymentAd,
    }

    


    useEffect(() => {
        if (activeOrder == null && orders.length > 0) {
            const { 0: orders } = orders.filter(
                (order) => order._id === params._id
                );
                setActiveOrder(order);
            }
        }, [orders, activeOrder, params._id]);
        

      const handleSubmit = async(e) => {
            e.preventDefault();
            
            
            try{
                const res = await axios.post(`${URL}/payment`, formData)    
                if (res && res.status) {
                    if (res.status === 200 || res.status === 201) {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "El informe de pago fue realizado con éxito!",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      setTimeout(() => {
                        clearShopInformationAndRedirect();
                      }, 2000)
                    }
                   
                  }
            }catch(error){
                console.log(error)
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error",
                    text: error.response.data.msg,
                    showConfirmButton: false,
                    timer: 1500,
                  });
            }
      }


    return (
        <>
        {activeOrder === null ? (
            'Cargando Pedido...'
        ) :
        (
            <>
            <section className="container">
                <div className="bg-warning p-4 ">
                    <h2 className="text-center">Datos de transferencia y informe de pago</h2>
                </div>

                <div className="row ">
                    <div className="col-sm-12 col-md-6 mt-3 text-dark ">
                    <h3 className="text-center">Datos a transferir</h3>
                    <hr />
                    <img src={bancoestado} alt="bancoEstado logo" className="w-50 mb-2" />
                    <p>Titular: <b>Erick Andres Sucarrat Ibañez</b></p>
                    <p>Cuenta Vista: <b>Chequera Electronica Nº 36372381579 </b> </p>
                    <p>RUT: <b>18.478.062-3</b></p>
                    <p>Pagar: <b className="text-success">${activeOrder?.totalPrice} </b>CLP</p>
                    <p className="text-danger">Por favor no olvides informarnos el pago para que podamos acreditarlo a tu cuenta.</p>
                    </div>
                    <div className="col-sm-12 col-md-6 text-dark mt-3">
                        <form onSubmit={handleSubmit}>
                        <h3 className="text-center">Informar pago realizado</h3>
                        <hr />
                        <div className="mb-3">
                                <label>Numero de pedido</label>
                            <input className="form-control w-100" type="text" value={paymentAd} name="paymentId" onChange={onInputChange} disabled required/>
                            </div>
                            <div className="mb-3">
                                <label>Medio de pago</label>
                            <select className="form-select" onChange={onInputChange} name="paymentMethod" value={formState.paymentMethod} required>
                                <option selected>Elegir medio de pago</option>
                                <option>Transferencia Bancaria</option>
                                <option>Deposito</option>
                            </select>
                            </div>
                            <div className="mb-3">
                                <label>Nombre del banco / Caja vecina</label>
                            <input className="form-control w-100" type="text" placeholder="ingrese aquí nombre del banco o Caja vecina" name="bank" value={formState.bank} onChange={onInputChange} required />

                            </div>
                            <div className="mb-3">
                                <label>Número de operación o comprobante</label>
                            <input className="form-control w-100" type="number"  placeholder="ingrese aquí el Número de operación o comprobante" name="numberOperation" value={formState.numberOperation} onChange={onInputChange} required/>
                            </div>
                            <div className="mb-3">
                                <label>Total pagado $</label>
                            <input className="form-control w-100" type="text" name="transferred" value={transferredAd} onChange={onInputChange} disabled/>
                            </div>
                            <div className="mb-3">
                                <label>Productos</label>
                            <input className="form-control w-100" type="text" value={activeOrder?.details} disabled/>
                            </div>
                            <div className="mb-3">
                                <label>Comentario (opcional)</label>
                                <br />
                            <textarea className="form-control" name="comments" value={formState.comments} onChange={onInputChange} ></textarea>
                            </div>

                            <button className="btn btn-success w-100 mt-2" type="submit"><b>Enviar</b></button>
                        </form>
                    </div>
                </div>
            </section>

            </>
        )
    
    }
        </>
    )
}
