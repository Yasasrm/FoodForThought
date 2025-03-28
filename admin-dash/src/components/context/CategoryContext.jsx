import React, { createContext, useState } from 'react'
export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const [categoryList, setCategoryList] = useState([]);
  
    return (
      <CategoryContext.Provider value={{ categoryList, setCategoryList }}>
        {children}
      </CategoryContext.Provider>
    );
  };

  export default CategoryProvider;
