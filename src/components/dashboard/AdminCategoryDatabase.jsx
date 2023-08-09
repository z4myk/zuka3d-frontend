import React, { useEffect } from "react";
import { useCategoryStore } from "../../hooks/useCategoryStore";
import { faPlus, faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AdminCategoryDatabaseItem } from "./AdminCategoryDatabaseItem";
import {AddCategory} from './AddCategory'
import { Link } from "react-router-dom";
import "./dashboard.css";
export const AdminCategoryDatabase = () => {
  const { categorys, startLoadingCategory } = useCategoryStore();



  return (
    <div className="container ">
      <Link to="/administracion">
          <button className="btn btn-outline-warning border-2 mx-5 mb-4">
            <FontAwesomeIcon icon={faCircleLeft}  /> Volver atrás
          </button>
        </Link>
 <div className="row">
      <div className="col-sm-12 col-md-4">
      <AddCategory />
       
      </div>

      <div className="col-sm-12 col-md-8 ">
        <div className="text-dark">
          <h3>Categorias</h3>
          <hr />
          <div className="mb-3 mt-2">
            <input
              type="text"
              placeholder="Buscar Categoria"
              className="w-100 form-control"
            />
          </div>
          <table className="table table-light table-hover table-responsive text-light container">
            <thead>
              <tr className="">
                <th>Categorias</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {categorys &&
                categorys.map((category) => (
                  <AdminCategoryDatabaseItem
                    key={category._id}
                    category={category}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};
