import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faPencil,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
import {useProductStore} from '../../hooks/useProductStore';
import {useUiStore} from '../../hooks/useUiStore';
import {ProductModal} from '../products/ProductModal';
import Swal from "sweetalert2";

export const AdminProductDatabaseItem = ({product}) => {
    console.log(product)
    const {setActiveProduct, startDeleteProduct, activeProduct} = useProductStore();
    const { openDateModal } = useUiStore();
    
    const handleDelete = () => {
        setActiveProduct(product);
        Swal.fire({
            title: '¿Estás seguro?',
            text: "esta opción no se podra revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
            
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteProduct(product);
            }
        })
    }

    const handleEdit = () => {
        openDateModal();
        setActiveProduct(product);
      
    }
     
    return (
        <>
            <tr className="">
                <td ># {product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description.slice(0,30) + "..."}</td>
                <td>${product.price}</td>

                <td className="d-flex gap-1">
                    <button className="btn btn-warning text-light" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>{" "}
                    <br />{" "}
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </td>
            </tr>
            <ProductModal />
        </>
    )
}
