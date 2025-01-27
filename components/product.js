"use client"
import React, { useEffect, useState } from 'react'

// Corrected the function name and ensured it always returns an array.
const getProducts = async () => {
    try {
        let response = await fetch("/api/productsapi", {
            cache: 'no-cache',
        });

        let data = await response.json();

        if (data.success) {
            return data.result; // Expected to be an array of products
        } else {
            return []; // Return an empty array if the API indicates failure
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Return an empty array in case of fetch error
    }
};

const ProductList = () => {
    const [productlist, setProductList] = useState([]); // State initialized as an array

    useEffect(() => {
        const loadProducts = async () => {
            const products = await getProducts(); // Use corrected function
            setProductList(products); // Set the state to the fetched products
        };
        loadProducts();
    }, []);

    return (
        <div>
            <div className='flex justify-center items-center text-2xl gap-[25vw] text-center'>
                    <div className='w-52 border-2 border-blue-300'>brand</div>
                    <div className='w-52 border-2 border-blue-300'>price</div>
                    <div className='w-52 border-2 border-blue-300'>quantity</div>
            </div>
            {
                // Add a check to ensure productlist is an array before mapping
                Array.isArray(productlist) && productlist.length > 0 ? (
                    productlist.map((item, index) => (
                        <div key={index}>
                            <div className='flex justify-center items-center gap-[25vw] text-center'>   
                                <div className='w-52 mt-2'>{item.brand}</div>
                                <div className='w-52 mt-2'>{item.price}</div>
                                <div className='w-52 mt-2'>{item.quantity}</div>
                            </div>
                            
                        </div>
                    ))
                ) : (
                    <div>No products available</div> // Fallback message
                )
            }
        </div>
    );
};

export default ProductList;
