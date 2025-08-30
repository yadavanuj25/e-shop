// src/pages/AllProducts.jsx
import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSlice";
import ProductGrid from "../components/ProductGrid";

const AllProducts = () => {
  const products = useSelector(selectAllProducts);

  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">All Products</h1>
      <ProductGrid products={products} />
    </section>
  );
};

export default AllProducts;
