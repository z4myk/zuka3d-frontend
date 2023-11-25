import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Pagination = ({page, increment, decrement, lastPage}) => {
    const prevPage = () => {
        if(page>1){
            decrement()
        }
    }

    const nextPage = () => {
        if(page<lastPage){
            increment()
        }
    }
    

    return (
    <>
        <div className="container d-flex justify-content-center  ">
        <a href="#"><button className='btn btn-outline-dark' onClick={prevPage}> <FontAwesomeIcon icon={faArrowLeft} /></button></a> 
            
                <b className="m-2 text-dark">Pagina <span className='text-dark' >{page} de {lastPage}</span></b>
                <a href="#"><button className=' btn btn-outline-dark ' onClick={nextPage} ><FontAwesomeIcon icon={faArrowRight} /></button></a> 
        </div>
        </>
    )
}