import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
  const images = ["/images/banner1.jpg", "/images/banner2.jpg"];

  return (
    <div className="container mx-auto px-4 py-6 my-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={`/e-shop/${src}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
