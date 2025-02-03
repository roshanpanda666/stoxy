"use client";

import Header from '@/components/header';
import React, { useRef, useState } from 'react';

const page = () => {


  const slugref = useRef();
  const quantityref = useRef();
  const priceref = useRef();



  const clearinput = () => {
    slugref.current.value = "";
    priceref.current.value = "";
    quantityref.current.value = "";
  };

  return (
    <div className="p-4 sm:p-8">
      <Header />

      <div className='flex justify-center item-center mt-4'>
        <div className='text-green-400'>
          product edited successfully
        </div>
      </div>


      {/* edit product form */}
      <div className="flex flex-col items-center mt-8 gap-5">
        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Slug</div>
          <input
            ref={slugref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Quantity</div>
          <input
            ref={quantityref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Price</div>
          <input
            ref={priceref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex gap-4 w-full sm:w-auto justify-center">
          <button
            
            className="border-2 border-blue-300 bg-blue-300 text-black w-full sm:w-28 py-2 rounded-md hover:border-green-400 hover:bg-black hover:text-white"
          >
            Edit Product
          </button>
          <button
            onClick={clearinput}
            className="bg-red-400 text-black w-full sm:w-28 py-2 rounded-md"
          >
            Clear Inputs
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
