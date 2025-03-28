import React, { useContext } from "react";
import { CategoryContext } from "../context/CategoryContext";

function ProductForm() {
  const list = useContext(CategoryContext);
  const handleAddProduct = () => {
    //To do
  };
  return (
    <>
      <div className="form-group">
        <label for="productName">Product Name</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter Product Name"
        />
      </div>
      <div className="form-group">
        <label for="productPrice">Product Price</label>
        <input
          type="text"
          className="form-control"
          id="productPrice"
          placeholder="Enter Product Price"
        />
      </div>
      <div className="form-group">
        <label for="productCategory">Product Category</label>
        <select className="form-control" id="productCategory">
          {list.categoryList.map((item) => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label for="productQuantity">Product Quantity</label>
        <input
          type="number"
          className="form-control"
          id="productQuantity"
          placeholder="Enter Product Quantity"
        />
      </div>
      <div className="form-group">
        <label for="exampleFormControlTextarea1">Example textarea</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <br/>
      <button class="btn btn-sm btn-primary" onClick={handleAddProduct}>
        Add Product
      </button>
    </>
  );
}

export default ProductForm;
