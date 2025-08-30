import React from "react";
import ReactDOM from "react-dom/client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/e-shop/">
        <App />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          limit={3}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
