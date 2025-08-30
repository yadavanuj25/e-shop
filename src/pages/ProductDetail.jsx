import React from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSlice";
import { addToCart } from "../features/cart/cartSlice";
import { FaStar } from "react-icons/fa";
// import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <div className="p-4 text-red-500">Product not found.</div>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto p-6">
        {/* ✅ Breadcrumbs */}
        <div className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="capitalize">{product.category}</span> /{" "}
          <span className="text-gray-800 font-medium">{product.title}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* ✅ Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full md:w-1/2 h-auto object-cover rounded shadow"
          />

          {/* ✅ Product Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600 mb-2">{product.description}</p>

            {/* ✅ Star Rating (static 4/5) */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                4.0 (24 reviews)
              </span>
            </div>

            {/* ✅ Price */}
            <p className="text-2xl text-blue-600 font-semibold mb-4">
              ₹{product.price}
            </p>

            {/* ✅ Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products
            .filter(
              (p) => p.id !== product.id && p.category === product.category
            )
            .slice(0, 3)
            .map((related) => (
              <Link
                to={`/product/${related.id}`}
                key={related.id}
                className="border p-4 rounded-md hover:shadow transition"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold">{related.title}</h3>
                <p className="text-sm text-gray-500">{related.category}</p>
                <p className="font-bold text-blue-600 mt-1">₹{related.price}</p>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
