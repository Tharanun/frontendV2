import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';



const CreateSellForm = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/product/productAll"
      );
      const sortedProducts = response.data.sort((a, b) => a.id - b.id);
      setProducts(sortedProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAmount = async () => {
    try {
      // ค้นหา product ที่ตรงกับ productId จาก products array
      const selectedProduct = products.find(
        (product) => product.id === parseInt(input.productId, 10)
      );

      if (selectedProduct.amountProduct < 1) {
        Swal.fire({
          icon: "error",
          title: "สินค้าไม่พอจ่าย",
        });
        return;
      }
      
      if (selectedProduct.amountProduct - input.amount < 0) {
        Swal.fire({
          icon: "error",
          title: "สินค้าไม่พอจ่าย",
        });
        return;
      }
      // ลบจำนวนจาก product.amountProduct
      selectedProduct.amountProduct -= input.amount;

      // ส่งข้อมูลที่มีการปรับเปลี่ยนไปยังฐานข้อมูล
      const response = await axios.put(
        `http://localhost:8080/product/update/${selectedProduct.id}`,
        {
          amountProduct: selectedProduct.amountProduct,
        }
      );

      // ... (รายละเอียดเดิมที่กล่าวถึง)

      // ล้างค่า input
      setInput({
        amount: 0,
        userId: "",
        adminId: "",
        productId: "",
      });

      // รีเฟรชข้อมูลหลังจากทำการลบ
      fetchData();
    } catch (err) {
      console.log(err.message);
      showAlert("error", "Error! Failed to delete amount.");
    }
  };

  useEffect(() => {
    products.forEach((product) => {
      console.log(product.id);
      console.log(product.amountProduct);
    });
  }, [products]);
  
  
  const [input, setInput] = useState({
    amount: 0,
    userId: '',
    adminId: '',
    productId: '',
  });

  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ใช้ parseInt เพื่อแปลงค่าเป็น integer
    setInput((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const selectedProduct = products.find(
        (product) => product.id === parseInt(input.productId, 10)
      );

      if (selectedProduct.amountProduct < 1) {
        Swal.fire({
          icon: "error",
          title: "สินค้าไม่พอจ่าย",
        });
        return;
      }
      
      if (selectedProduct.amountProduct - input.amount < 0) {
        Swal.fire({
          icon: "error",
          title: "สินค้าไม่พอจ่าย",
        });
        return;
      }
      console.log(input)

      const response = await axios.post('http://localhost:8080/sell/create', input);

      if (response.status === 200) {
        showAlert('success', 'Sell created successfully!');
      } else {
        showAlert('error', 'Error! Failed to create the sell.');
      }

      setInput({
        amount: 0,
        userId: '',
        adminId: '',
        productId: '',
      });
    } catch (err) {
      console.log(err.message);
      showAlert('error', 'Error! Failed to create the sell.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="bg-primary p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Create Sell</h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>
          <div className="mb-4 text-base-content">
            <label htmlFor="amount" className="block text-sm font-medium text-white">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={input.amount}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="userId" className="block text-sm font-medium text-white">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={input.userId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="adminId" className="block text-sm font-medium text-white">
              Admin ID
            </label>
            <input
              type="text"
              id="adminId"
              name="adminId"
              value={input.adminId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="productId" className="block text-sm font-medium text-white">
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              value={input.productId}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            onClick={handleDeleteAmount}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Create Sell
          </button>
        </form>

        {/* Alert */}
        {alert && (
          <div
            role="alert"
            className={`alert ${
              alert.type === 'success' ? 'bg-green-700' : 'bg-red-700'
            } text-white mt-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              {alert.type === 'success' ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              )}
            </svg>
            <span>{alert.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSellForm;
