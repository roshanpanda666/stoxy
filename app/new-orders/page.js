"use client";

import Header from "@/components/header";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/deleteuser/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        console.log(result.message);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  

  const handleOrderDispatch = async (id) => {
    try {
      const res = await fetch(`/api/updatebuying/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buying: "order dispatch" }),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, buying: result.user.buying } : u
          )
        );
      } else {
        alert(result.message || "Failed to update buying status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleOrderCancel = async (id) => {
    try {
      const res = await fetch(`/api/updatebuying/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ buying: "order canceled" }),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert(result.message);
        setUsers((prev) =>
          prev.map((u) =>
            u._id === id ? { ...u, buying: result.user.buying } : u
          )
        );
      } else {
        alert(result.message || "Failed to update buying status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch users on mount and every 1 second
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getalluser");
        const data = await res.json();
        setUsers(data.reverse()); // reverse to show newest first
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers(); // initial fetch

    const interval = setInterval(fetchUsers, 1000); // refresh every 1s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="p-4">
      <Header />
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-sm text-white border-cyan-300"
            >
              <h3 className="text-lg font-semibold">
                {user.username} ({user.email})
              </h3>
              <p>Password: {user.password}</p>
              <p>Buying status: {user.buying}</p>

              <div className="mt-2">
                <h4 className="font-medium">Products:</h4>
                {user.products && user.products.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {[...user.products]
                      .slice(-3)
                      .reverse()
                      .map((prod, idx) => (
                        <li key={idx}>
                          {prod.brand} - ₹{prod.price} x {prod.quantity}
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>No products listed.</p>
                )}

                <div className="flex gap-7">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleOrderDispatch(user._id)}
                    className="mt-2 px-3 py-1 bg-cyan-400 text-black rounded"
                  >
                    Order Dispatch
                  </button>

                  <button
                  onClick={() => handleOrderCancel(user._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    cancel order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
