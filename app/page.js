"use client";

import Header from '@/components/header';
import ProductList from '@/components/product';
import React, { useRef } from 'react';

const page = () => {
  const slugref = useRef();
  const quantityref = useRef();
  const priceref = useRef();

  const addProduct = async () => {
    const slugafter = slugref.current.value;
    const quantityafter = parseInt(quantityref.current.value, 10); // Convert to number
    const priceafter = parseFloat(priceref.current.value); // Convert to number

    let response = await fetch("/api/productsapi", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        brand: slugafter,
        price: priceafter,
        quantity: quantityafter,
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Data added successfully");
      window.location.reload(); // Refresh the current page
    } else {
      alert("Failed to add data");
    }
  };

  const clearinput = () => {
    slugref.current.value = "";
    priceref.current.value = "";
    quantityref.current.value = "";
  };

  return (
    <div>
      <Header />

      {/* Search bar with dropdown */}
      <div className="flex justify-center items-center flex-col mt-5">
        <div className="w-[95vw] flex gap-4">
          {/* Dropdown */}
          <select className="border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md">
            <option value="all">All</option>
            <option value="category">Category</option>
          </select>

          {/* Search input */}
          <input
            type="text"
            placeholder="Search..."
            className="flex-grow border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
          <button className="border-2 border-blue-300 bg-blue-300 text-black px-5 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>

      {/* Add product form */}
      <div className="flex justify-center items-center flex-col mt-8">
        <div className="w-[95vw]">
          <div>Slug</div>
          <div>
            <input
              ref={slugref}
              type="text"
              className="w-[95vw] border-2 border-blue-300 bg-black text-white"
            />
          </div>
        </div>
        <div className="w-[95vw] mt-5">
          <div>Quantity</div>
          <div>
            <input
              ref={quantityref}
              type="text"
              className="w-[95vw] border-2 border-blue-300 bg-black text-white"
            />
          </div>
        </div>
        <div className="w-[95vw] mt-5">
          <div>Price</div>
          <div>
            <input
              ref={priceref}
              type="text"
              className="w-[95vw] border-2 border-blue-300 bg-black text-white"
            />
          </div>
        </div>
        <div>
          <button
            onClick={addProduct}
            className="border-blue-300 border-2 bg-blue-300 text-black w-28 mt-5"
          >
            Add Product
          </button>
        </div>

        <div>
          <button
            onClick={clearinput}
            className="bg-red-400 text-black w-28 mt-5"
          >
            Clear Inputs
          </button>
        </div>
      </div>

      {/* Current Stock */}
      <div className="bg-slate-900 mt-8">
        <div className="text-3xl mb-10 mt-7 text-center">Current Stock</div>
        <ProductList />
      </div>
    </div>
  );
};

export default page;
