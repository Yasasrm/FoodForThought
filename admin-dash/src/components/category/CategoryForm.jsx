import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";

function CategoryForm() {
  const { categoryList, setCategoryList } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState("");
  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;

    const newCategory = { name: categoryName };

    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setCategoryList([...categoryList, data]);
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  return (
    <>
      <div class="form-group">
        <label for="categoryName">Category</label>
        <input
          type="text"
          class="form-control"
          id="categoryName"
          aria-describedby="categoryHelp"
          placeholder="Enter Category"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {/* <small id="categoryHelp" class="form-text text-muted">
          Enter new product category.
        </small> */}
        <br />
      </div>
      <button class="btn btn-sm btn-primary" onClick={handleAddCategory}>
        Add Category
      </button>
    </>
  );
}

export default CategoryForm;
