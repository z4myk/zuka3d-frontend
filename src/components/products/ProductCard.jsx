import React from 'react'
import {useProductStore} from '../../hooks/useProductStore';
import {ProductItem} from '../products/ProductItem'
export const ProductCard = () => {

    const {products} = useProductStore();



    return (
        <div className=" d-flex justify-content-around flex-wrap ">
            {products?.map((product) => (
                <ProductItem  product={product} key={product._id} />
            ))}
        </div>
    )
}
