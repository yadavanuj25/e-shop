import React from "react";

const ThreeCardSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="threeCard shipping rounded-lg shadow-md p-6 text-center flex flex-col justify-center align-center">
            <h3 className="text-lg font-bold mb-2 ">Free Shipping</h3>
            <p className="text-dark text-large">On all orders over ₹999</p>
          </div>

          {/* Card 2 */}
          <div className="threeCard delivery card-2 rounded-lg shadow-md p-6 text-center flex flex-col justify-center align-center">
            <h3 className="text-lg font-bold mb-2">Easy Returns</h3>
            <p className="text-dark fs-4">Within 7 days of delivery</p>
          </div>

          {/* Card 3 */}
          <div className="threeCard support rounded-lg shadow-md p-6 text-center flex flex-col justify-center align-center">
            <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
            <p className="text-dark text-large">Chat with us anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreeCardSection;
