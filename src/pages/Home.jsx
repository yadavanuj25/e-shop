import React from "react";
import { useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";
import ImageSlider from "../components/ImageSlider";
import ThreeCardSection from "../components/ThreeCardSection";

const Home = () => {
  const products = useSelector(selectAllProducts);

  return (
    <>
      <ImageSlider />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <ThreeCardSection />
    </>
  );
};

export default Home;
