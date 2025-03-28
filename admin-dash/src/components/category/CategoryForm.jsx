import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";

function CategoryForm() {
  const { categoryList, setCategoryList } = useContext(CategoryContext);
  const [categoryName, setCategoryName] = useState("");
  const handleAddCategory = () => {
    const newCategory = { id: categoryList.length + 1, name: categoryName };
    setCategoryList([...categoryList, newCategory]);
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
