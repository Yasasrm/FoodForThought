import React, { useContext } from "react";
import { NavTabSelectContext } from "./context/NavTabSelectContext";
import CategoryForm from "./category/CategoryForm";
import CategoryManager from "./category/CategoryManager";
import ProductForm from "./product/ProductForm";
import ProductManager from "./product/ProductManager";
import DonationForm from "./donation/DonationForm";
import DonationManager from "./donation/DonationManager";
import UserManager from "./user/UserManager";
import CategoryProvider from "./context/CategoryContext";

function BodyLayout() {
  const { tabId } = useContext(NavTabSelectContext);
  return (
    <>
      <CategoryProvider>
        <div className="col-sm-8">
          {tabId === 0 ? (
            <CategoryForm />
          ) : tabId === 1 ? (
            <ProductForm />
          ) : tabId === 2 ? (
            <DonationForm />
          ) : tabId === 3 ? (
            <UserManager />
          ) : null}
        </div>
        <div className="col-sm-4">
          {tabId === 0 ? (
            <CategoryManager />
          ) : tabId === 1 ? (
            <ProductManager />
          ) : tabId === 2 ? (
            <DonationManager />
          ) : null}
        </div>
      </CategoryProvider>
    </>
  );
}

export default BodyLayout;
