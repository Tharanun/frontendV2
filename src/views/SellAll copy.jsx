import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const response = await axios.get('http://localhost:8080/product/productAll');
const products = response.data;
console.log(products)

const SellAll = () => {
  const [sell, setSell] = useState([]);
  const [editingSellId, setEditingSellId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    sell_Date: "",
    amount: "", 
    userId: "", 
    adminId: "", 
    productId: ""
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/sell/sellAll');
      const sortedsell = response.data.sort((a, b) => a.id - b.id);
      setSell(sortedsell);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (SellId) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
          actions: 'my-actions',
          cancelButton: 'order-1 right-gap',
          confirmButton: 'order-2',
          denyButton: 'order-3',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`http://localhost:8080/sell/delete/${SellId}`);
          console.log(response);
          fetchData(); // Reload data after deletion
          Swal.fire('sell deleted successfully!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('You canceled the deletion.', '', 'info');
        }
      });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdate = (sell) => {
    setEditingSellId(sell.id);
    setEditFormData({
      username: sell.username,
      tel: sell.tel,
      email: sell.email,
      // Set other fields accordingly
    });
  };
  
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, SellId) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/sell/update/${SellId}`, {
        ...editFormData,
      });
      console.log(response);

      setEditingSellId(null);
      setEditFormData({
        username: "",
        tel: "",
        email: "",
      });
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
      console.log('API Error:', error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">Sell List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">User ID</th>
              <th className="border px-4 py-2">Products</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Admin</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sell.map((sell) => (
                <tr key={sell.id}>
                    <td className="border px-4 py-2 text-center">{sell.userId}</td>
                    <td className="border px-4 py-2 text-center">{sell.productId}</td>
                    <td className="border px-4 py-2 text-center">{sell.amount}</td>
                    <td className="border px-4 py-2 text-center">{new Date(sell.sellDate).toLocaleString()}</td>
                    <td className="border px-4 py-2 text-center">{sell.adminId}</td>
                    <td className="border px-4 py-2 text-center">
                        <button
                        className="btn btn-primary mx-1"
                        onClick={() => handleUpdate(sell)}
                        >
                        Update
                        </button>
                        <button
                        className="btn btn-secondary"
                        onClick={() => handleDelete(sell.id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingSellId && (
        <form
          className="mt-4 space-y-2"
          onSubmit={(e) => handleEditSubmit(e, editingSellId)}
        >
          {/* Add input fields for editing data */}
        </form>
      )}
    </div>
  );
};

export default SellAll;
