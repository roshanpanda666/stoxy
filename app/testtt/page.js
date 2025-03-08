"use client";

const Page = () => {

  const addProduct = async () => {

    let response = await fetch("/api/productsapi", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        brand: "test",
        price: "test",
        quantity: "test",
      }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Product added successfully");
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


      {/* Search bar with dropdown */}

      {/* Add product form */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <button
            onClick={addProduct}
            className="border-2 border-blue-300 bg-blue-300 text-black w-full sm:w-32 py-2 rounded-md hover:border-green-400"
          >
            click
          </button>
        </div>
      </div>
  );
};

export default Page;