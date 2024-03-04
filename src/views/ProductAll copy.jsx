import React, { useState, useEffect } from "react";
import axios from "axios";

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
      const response = await axios.delete(
        `http://localhost:8080/product/delete/${productId}`
      );
      console.log(response);
      fetchData(); // Reload data after deletion
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
      const response = await axios.put(`http://localhost:8080/product/update/${productId}`, {
        ...editFormData,
        price: parseInt(editFormData.price),
        amountProduct: parseInt(editFormData.amountProduct),
      });
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
    <div>
      <h2 className="text-2xl font-bold mb-4 text-base-content">
        Product List
      </h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={`border p-4 my-4 rounded ${
              product.id % 2 === 0 ? "bg-base-100" : "bg-base-300"
            }`}
          >
            <h3 className="text-xl font-bold ">{product.productName}</h3>
            <p>{product.details}</p>
            <p>ราคา: {product.price} บาท</p>
            <p>จำนวน: {product.amountProduct} ต้น</p>
            <button
              className="btn btn-active btn-primary mr-2 mt-2"
              onClick={() => handleUpdate(product)}
            >
              Update
            </button>
            <button
              className="btn btn-active btn-secondary"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
            {editingProductId === product.id && (
              <form onSubmit={(e) => handleEditSubmit(e, editingProductId)}>
                <input
                  type="text"
                  name="productName"
                  placeholder="Product Name"
                  value={editFormData.productName}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="details"
                  placeholder="Product details"
                  value={editFormData.details}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={editFormData.price.toString()}
                  onChange={handleEditChange}
                />
                <input
                  type="text"
                  name="amountProduct"
                  placeholder="amountProduct"
                  value={editFormData.amountProduct.toString()}
                  onChange={handleEditChange}
                />
                {/* Add other fields */}
                <button type="submit">Submit Update</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductAll;