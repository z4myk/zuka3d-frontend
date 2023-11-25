import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faPencil,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import {useCategoryStore} from '../../hooks/useCategoryStore';
  import {useUiStore} from '../../hooks/useUiStore';
  import {AdminCategoryModal} from '../dashboard/AdminCategoryModal';


  import Swal from "sweetalert2";
export const AdminCategoryDatabaseItem = ({category}) => {


    const {startDeleteCategory, setActiveCategory} = useCategoryStore();
    const {openCategoryModal} = useUiStore();
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

    const handleEdit = () => {
        openCategoryModal();
        setActiveCategory(category);

    }


    return (
        <>
        <tr className="" key={category._id}>
            <td>{category.cat}</td>
            <td className="d-flex gap-1">
                <button className="btn btn-warning text-light" onClick={handleEdit} >
                    <FontAwesomeIcon icon={faPencil} />
                </button>{" "}
                <br />{" "}
                <button className="btn btn-danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </td>
        </tr>
        <AdminCategoryModal />
    </>
)
    
}
