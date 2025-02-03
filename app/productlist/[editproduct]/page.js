"use client";

import Header from '@/components/header';
import React, { useRef, useState, useEffect } from 'react';

const Page = (props) => {
  const slugRef = useRef();
  const quantityRef = useRef();
  const priceRef = useRef();

  const getProductDetail = async () => {
    try {
      const productId = props.params.editproduct;
      const response = await fetch(`/api/productsapi/${productId}`);
      const productData = await response.json();
      const result = productData.result;

      if (result) {
        slugRef.current.value = result.name || "";
        quantityRef.current.value = result.quantity || "";
        priceRef.current.value = result.price || "";
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const updateProduct = async () => {
    try {
      const productId = props.params.editproduct;
      const updatedData = {
        name: slugRef.current.value,
        quantity: quantityRef.current.value,
        price: priceRef.current.value,
      };

      const response = await fetch(`/api/productsapi/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (data.result) {
        alert("Product updated successfully!");
      } else {
        alert("Product update failed.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  const clearInput = () => {
    slugRef.current.value = "";
    priceRef.current.value = "";
    quantityRef.current.value = "";
  };

  return (
    <div className="p-4 sm:p-8">
      <Header />

      <div className='flex justify-center items-center mt-4'>
        <div className='text-green-400'>Product edited successfully</div>
      </div>

      <div className="flex flex-col items-center mt-8 gap-5">
        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Slug</div>
          <input
            ref={slugRef}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Quantity</div>
          <input
            ref={quantityRef}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="w-full sm:w-[95vw]">
          <div className="mb-2">Price</div>
          <input
            ref={priceRef}
            type="text"
            className="w-full border-2 border-blue-300 bg-black text-white px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={updateProduct}
            className="border-2 border-blue-300 bg-blue-300 text-black w-full sm:w-28 py-2 rounded-md hover:border-green-400 hover:bg-black hover:text-white"
          >
            Edit Product
          </button>
          <button
            onClick={clearInput}
            className="bg-red-400 text-black w-full sm:w-28 py-2 rounded-md"
          >
            Clear Inputs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
