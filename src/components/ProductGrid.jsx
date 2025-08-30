import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import debounce from "lodash/debounce";
import { FaList, FaTh } from "react-icons/fa";

const ProductGrid = ({ products }) => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [rating, setRating] = useState("All");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [view, setView] = useState("grid");

  const productsPerPage = 8;
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const brands = ["All", ...new Set(products.map((p) => p.brand))];
  const ratings = ["All", 5, 4, 3, 2, 1];

  const debouncedSearch = useMemo(
    () => debounce((value) => setSearchTerm(value), 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const filteredProducts = products
    .filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const matchBrand = brand === "All" || p.brand === brand;
      const matchRating = rating === "All" || Math.floor(p.rating) >= rating;
      const matchSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchMin = minPrice === "" || p.price >= parseFloat(minPrice);
      const matchMax = maxPrice === "" || p.price <= parseFloat(maxPrice);
      return (
        matchCategory &&
        matchBrand &&
        matchRating &&
        matchSearch &&
        matchMin &&
        matchMax
      );
    })
    .sort((a, b) => {
      if (sort === "lowToHigh") return a.price - b.price;
      if (sort === "highToLow") return b.price - a.price;
      if (sort === "popularity") return b.rating - a.rating;
      if (sort === "newest")
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      return 0;
    });

  const startIdx = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + productsPerPage
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const clearFilters = () => {
    setCategory("All");
    setBrand("All");
    setRating("All");
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="px-4 py-2 border rounded w-full md:w-1/3 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Min ₹"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-24 dark:bg-gray-800 dark:text-white"
        />
        <input
          type="number"
          placeholder="Max ₹"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-24 dark:bg-gray-800 dark:text-white"
        />

        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          {brands.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          value={rating}
          onChange={(e) => {
            setRating(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          {ratings.map((r, i) => (
            <option key={i} value={r}>
              {r === "All" ? "All Ratings" : `${r}★ & up`}
            </option>
          ))}
        </select>
        {(category !== "All" ||
          brand !== "All" ||
          rating !== "All" ||
          searchTerm ||
          minPrice ||
          maxPrice) && (
          <button
            onClick={clearFilters}
            className="ml-auto text-sm text-red-500 hover:underline"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Filter Chips + Clear Button */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        {category !== "All" && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {category}{" "}
            <button onClick={() => setCategory("All")}>&times;</button>
          </span>
        )}
        {brand !== "All" && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {brand} <button onClick={() => setBrand("All")}>&times;</button>
          </span>
        )}
        {rating !== "All" && (
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            {rating}★ <button onClick={() => setRating("All")}>&times;</button>
          </span>
        )}
        {searchTerm && (
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
            "{searchTerm}"{" "}
            <button onClick={() => setSearchTerm("")}>&times;</button>
          </span>
        )}

        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="text-sm text-gray-600 dark:text-gray-300 ml-auto flex items-center gap-2"
        >
          {view === "grid" ? <FaList /> : <FaTh />}{" "}
          {view === "grid" ? "List" : "Grid"} View
        </button>
      </div>

      {/* Category Buttons + Sort */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => {
              setCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm ${
              cat === category
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-white"
            }`}
          >
            {cat}
          </button>
        ))}

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
          className="ml-auto px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="default">Sort</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
          <option value="popularity">Popularity</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          No products match your filters. Try adjusting your search.
        </div>
      )}

      {/* Product Grid or List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: productsPerPage }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 dark:bg-gray-800 h-64 rounded-lg"
            />
          ))}
        </div>
      ) : (
        <>
          <div
            className={`transition-all duration-500 ${
              view === "list"
                ? "flex flex-col gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            }`}
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} view={view} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
