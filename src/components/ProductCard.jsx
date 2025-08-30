import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  FaStar,
  FaFire,
  FaThumbsUp,
  FaTag,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import {
  toggleWishlist,
  selectWishlistItems,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  // const [liked, setLiked] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item is addded to cart");
  };
  const handleBuyNow = () => {
    dispatch(addToCart(product));
    toast.success("Proceeding to buy");
  };
  // const toggleWishlist = () => setLiked(!liked);

  const wishlistItems = useSelector(selectWishlistItems);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const badgeIcons = {
    New: <FaStar className="inline mr-1" />,
    "Hot Deal": <FaFire className="inline mr-1" />,
    "Best Seller": <FaThumbsUp className="inline mr-1" />,
    Sale: <FaTag className="inline mr-1" />,
  };

  const badgeColors = {
    New: "bg-green-500",
    "Hot Deal": "bg-red-500",
    "Best Seller": "bg-blue-600",
    Sale: "bg-purple-600",
  };

  const getDiscountPercentage = () => {
    if (!product.oldPrice || product.oldPrice <= product.price) return null;
    const discount =
      ((product.oldPrice - product.price) / product.oldPrice) * 100;
    return Math.round(discount);
  };

  const discount = getDiscountPercentage();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col relative group bg-white dark:bg-gray-900">
      {/* Wishlist icon */}

      <button
        onClick={() => dispatch(toggleWishlist(product))}
        className="absolute top-2 right-2 cursor-pointer z-10 text-red-500"
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Badge */}
      {product.badge && (
        <span
          className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded flex items-center ${
            badgeColors[product.badge] || "bg-gray-500"
          }`}
          title={`This product is marked as "${product.badge}"`}
        >
          {badgeIcons[product.badge]} {product.badge}
        </span>
      )}

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md"
      />

      {/* Title + Category */}
      <h2 className="mt-3 text-lg font-semibold dark:text-white">
        {product.title}
      </h2>
      <p className="text-gray-500 text-sm">{product.category}</p>

      {/* Rating + Reviews */}
      <div className="flex items-center gap-1 mt-1">
        <span className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.floor(product.rating) ? "" : "opacity-30"}
            />
          ))}
        </span>
        <span className="text-sm text-gray-500 ml-1">
          ({product.reviews || 0})
        </span>
      </div>

      {/* Price & Discount */}
      <div className="mt-2">
        <span className="text-blue-600 font-bold text-lg">
          ₹{product.price}
        </span>
        {product.oldPrice && product.oldPrice > product.price && (
          <>
            <span className="text-gray-400 line-through text-sm ml-2">
              ₹{product.oldPrice}
            </span>
            <span className="ml-2 text-sm text-green-600 font-medium">
              {discount}% OFF
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      <div className="mt-1">
        {product.stock ? (
          <span className="text-sm text-green-600 font-medium">In Stock</span>
        ) : (
          <span className="text-sm text-red-500 font-medium">Out of Stock</span>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-2 pt-4">
        <button
          onClick={handleAddToCart}
          className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm"
        >
          Add to Cart
        </button>
        <button
          disabled={product.stock === false}
          onClick={handleBuyNow}
          className={`flex-1 py-2 rounded-md transition text-sm ${
            product.stock
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-red-300 text-white cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
