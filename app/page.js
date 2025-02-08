"use client";

import Header from '@/components/header';
import ProductList from '@/components/product';
import React, { useRef, useState } from 'react';

const Page = () => {
  const [notifyy, notifyupdate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");

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
      notifyupdate("Product added successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert("Failed to add data");
    }
  };

  const clearinput = () => {
    slugref.current.value = "";
    priceref.current.value = "";
    quantityref.current.value = "";
  };

  const handleSearch = () => {
    // You can add additional logic here if needed
    console.log("Search Query:", searchQuery);
    console.log("Category:", category);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <Header />

      <div className='flex justify-center items-center mt-4'>
        <div className='text-green-400 text-center'>{notifyy}</div>
      </div>

      {/* Search bar with dropdown */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-5 gap-4 w-full">
        <select 
          className="border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md w-full sm:w-40"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="category">Category</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className="flex-grow border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md w-full sm:w-auto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button 
          className="border-2 border-blue-300 bg-blue-300 text-black px-5 py-2 rounded-md w-full sm:w-auto"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Add product form */}
      <div className="flex flex-col items-center mt-8 gap-5 w-full">
        <div className="w-full sm:w-[90%]">
          <label className="block mb-2 text-white">Product name</label>
          <input
            ref={slugref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[90%]">
          <label className="block mb-2 text-white">Quantity</label>
          <input
            ref={quantityref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[90%]">
          <label className="block mb-2 text-white">Price</label>
          <input
            ref={priceref}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={addProduct}
            className="border-2 border-blue-300 bg-blue-300 text-black w-full sm:w-32 py-2 rounded-md hover:border-green-400"
          >
            Add Product
          </button>
          <button
            onClick={clearinput}
            className="bg-red-400 text-black w-full sm:w-32 py-2 rounded-md"
          >
            Clear Inputs
          </button>
        </div>
      </div>

      {/* Current Stock */}
      <div className="bg-slate-900 mt-8 px-4 py-6 rounded-md w-full sm:w-[90%] mx-auto">
        <div className="text-2xl sm:text-3xl mb-5 text-center text-white">Current Stock</div>
        <ProductList searchQuery={searchQuery} category={category} />
      </div>
    </div>
  );
};

export default Page;