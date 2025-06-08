"use client";

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
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/getalluser");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="border p-4 rounded-md shadow-sm text-white border-cyan-300  "
            >
              <h3 className="text-lg font-semibold">
                {user.username} ({user.email})
              </h3>
              <p>Password: {user.password}</p>
              <p>buying status: {user.buying}</p>

              <div className="mt-2">
                <h4 className="font-medium">Products:</h4>
                {user.products && user.products.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {user.products.map((prod, idx) => (
                      <li key={idx}>
                        {prod.brand} - ₹{prod.price} x {prod.quantity}
                      </li>
                    ))}
                    
                  </ul>
                ) : (
                  <p>No products listed.</p>
                  
                )}
                <button
                    onClick={() => handleDelete(user._id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded"
                    >
                    Delete
                    </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
