"use client"

import Header from '@/components/header'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'


const page = () => {

  const slugref=useRef()
  const quantityref=useRef()
  const priceref=useRef()


const addProduct=async()=>{

    const slugafter=slugref.current.value
    const quantityafter=quantityref.current.value
    const priceafter=priceref.current.value

    alert(slugafter)
    alert(quantityafter)
    alert(priceafter)

    // write the post method and push the data 
    let response =await fetch("/api/productsapi",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({
        brand:slugafter,
        price:priceafter,
        quantity:quantityafter
      })
    })

    const result= await response.json()
    if(result.success){
      alert("data added successfully")

    }
    else{
      alert("failed to add data")
    }

}

const clearinput=()=>{
  slugref.current.value=("")
  priceref.current.value=("")
  quantityref.current.value=("")
}

  return (
    <div>
      <Header></Header>

      {/* Search bar with dropdown */}
      <div className='flex justify-center items-center flex-col mt-5'>
        <div className='w-[95vw] flex gap-4'>
          {/* Dropdown */}
          <select className='border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md'>
            <option value="all">All</option>
            <option value="category">Category</option>
          </select>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            className='flex-grow border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md'
          />
          <button className='border-2 border-blue-300 bg-blue-300 text-black px-5 py-2 rounded-md'>
            Search
          </button>
        </div>
      </div>

      {/* Add product form */}
      <div className='flex justify-center items-center flex-col mt-8'>
        <div className='w-[95vw]'>
          <div>Slug</div>
          <div>
            <input ref={slugref} type="text" className='w-[95vw] border-2 border-blue-300 bg-black text-white' />
          </div>
        </div>
        <div className='w-[95vw] mt-5'>
          <div>Quantity</div>
          <div>
            <input ref={quantityref} type="text" className='w-[95vw] border-2 border-blue-300 bg-black text-white' />
          </div>
        </div>
        <div className='w-[95vw] mt-5'>
          <div>Price</div>
          <div>
            <input ref={priceref} type="text" className='w-[95vw] border-2 border-blue-300 bg-black text-white' />
          </div>
        </div>
        <div>
          <button onClick={addProduct} className='border-blue-300 border-2 bg-blue-300 text-black w-28 mt-5'>Add Product</button>
        </div>

        <div>
          <button onClick={clearinput} className='  bg-red-400 text-black w-28 mt-5'>clear inputs</button>
        </div>
      </div>

      {/* Current Stock */}
      <div className='bg-slate-900 mt-8'>
        <div className='text-3xl w-[90vw] mt-7'>
          Current Stock
        </div>
        <div className='mt-5'>
          <div className='flex justify-center item-center gap-72 mt-10'>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>Product Name</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>Quantity</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>Price</div>
          </div>
          <div className='flex justify-center items-center'>
          <div className='w-[95vw] border-[0.9px] border-blue-300 mt-7'></div>
          </div>

          <div className='flex justify-center item-center gap-72 mt-7'>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>Samsung Galaxy S21</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>300000</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>30000</div>
          </div>
          <div className='flex justify-center item-center gap-72 mt-7'>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>Samsung Galaxy S22 FE</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>300000</div>
            <div className='text-lg w-60 text-center border-l-2 border-r-2'>40000</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
