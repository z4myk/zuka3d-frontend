import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faPencil,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import {useCategoryStore} from '../../hooks/useCategoryStore';
  import Swal from "sweetalert2";
export const AdminCategoryDatabaseItem = ({category}) => {


    const {startDeleteCategory, setActiveCategory} = useCategoryStore();

    const handleDelete = () => {
        setActiveCategory(category)
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
                startDeleteCategory(category);
            }
        })
    }



    return (
        <>
        <tr className="">
            <td>{category.cat}</td>
            <td className="d-flex gap-1">
                <button className="btn btn-warning text-light" >
                    <FontAwesomeIcon icon={faPencil} />
                </button>{" "}
                <br />{" "}
                <button className="btn btn-danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </td>
        </tr>

    </>
)
    
}
