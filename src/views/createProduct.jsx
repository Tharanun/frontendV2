import axios from 'axios';
import { useState } from 'react';

export default function CreateProduct() {
  const [input, setInput] = useState({
    productName: '',
    productImg: null,
    amountProduct: 0,
    price: 0,
    cost: 0,
    details: '',
  });

  const [alert, setAlert] = useState(null);

  const hdlChange = (e) => {
    if (e.target.type === 'file') {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('productName', input.productName);
      formData.append('amountProduct', input.amountProduct);
      formData.append('price', input.price);
      formData.append('cost', input.cost);
      formData.append('details', input.details);
      formData.append('productImg', input.productImg);

      const rs = await axios.post('http://localhost:8080/product/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(rs);

      if (rs.status === 200) {
        showAlert('success', 'Your purchase has been confirmed!');
        window.location.reload();
      } else {
        showAlert('error', 'Error! Task failed successfully.');
      }

      setInput({
        productName: '',
        productImg: null,
        amountProduct: 0,
        price: 0,
        cost: 0,
        details: '',
      });
    } catch (err) {
      console.log(err.message);
      showAlert('error', 'Error! Task failed successfully.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      <div className="bg-primary p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-white">Create Product</h2>
        <form onSubmit={hdlSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="mb-4 text-base-content">
            <label htmlFor="username" className="block text-sm font-medium text-white">
              ProductName
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={input.productName}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              ProductImg
            </label>
            <input
              type="file"
              id="productImg"
              name="productImg"
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="tel" className="block text-sm font-medium text-white">
              amountProduct
            </label>
            <input
              type="number"
              id="amountProduct"
              name="amountProduct"
              value={input.amountProduct}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={input.price}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              cost
            </label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={input.cost}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4 text-base-content">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              details
            </label>
            <input
              type="text"
              id="details"
              name="details"
              value={input.details}
              onChange={hdlChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 "
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-5">
            <button
              type="reset"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Reset
            </button>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Create
            </button>
          </div>
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