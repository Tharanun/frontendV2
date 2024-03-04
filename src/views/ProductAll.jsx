import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    productName: "",
    details: "",
    price: 0,
    amountProduct: 0,
    // Add more fields as needed
  });

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDelete = async (productId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            `http://localhost:8080/product/delete/${productId}`
          );
          console.log(response);
          fetchData(); // Reload data after deletion
          Swal.fire("Product deleted successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("You canceled the deletion.", "", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = (product) => {
    setEditingProductId(product.id);
    setEditFormData({
      productName: product.productName,
      details: product.details,
      price: product.price,
      amountProduct: product.amountProduct,
      // Set other fields accordingly
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e, productId) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/product/update/${productId}`,
        {
          ...editFormData,
          price: parseInt(editFormData.price),
          amountProduct: parseInt(editFormData.amountProduct),
        }
      );
      console.log(response);
      setEditingProductId(null);
      setEditFormData({
        productName: "",
        details: "",
        price: 0,
        amountProduct: 0,
        // Reset other fields
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
      console.log("API Error:", error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">
        Product List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded shadow ${
              product.id % 2 === 0 ? "bg-base-100" : "bg-base-300"
            }`}
          >
            <img src ={product.productImg} alt="" className="rounded-xl w-[400px] h-[400px]"/>
            <h2 className="text-xl font-bold text-blue-700">
              ID : {product.id}
            </h2>
            <h3 className="text-xl font-bold text-blue-700">
              {product.productName}
            </h3>
            <p className="text-base-content">{product.details}</p>
            <p className="text-green-600">Price: {product.price} บาท</p>
            <p className="text-purple-600">Amount: {product.amountProduct} ต้น</p>
            <div className="mt-4 space-x-2">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
            {editingProductId === product.id && (
              <form
                className="mt-4 space-y-2"
                onSubmit={(e) => handleEditSubmit(e, editingProductId)}
              >
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={editFormData.productName}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="details"
                  placeholder="Product details"
                  value={editFormData.details}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={editFormData.price.toString()}
                  onChange={handleEditChange}
                  className="input"
                />
                <input
                  type="text"
                  name="amountProduct"
                  placeholder="Amount Product"
                  value={editFormData.amountProduct.toString()}
                  onChange={handleEditChange}
                  className="input"
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit Update
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAll;