import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomNotify = ({ type, message }) => {
  if (message && type) {
    if (type === "error") {
      toast.error(message, { autoClose: 3000, toastId: "error" });
    } else if (type === "success") {
      toast.success(message, { autoClose: 3000, toastId: "success" });
    } else if (type === "info") {
      toast.info(message, { autoClose: 3000, toastId: "info" });
    } else {
      toast.warn(message, { autoClose: 3000, toastId: "warning" });
    }
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default CustomNotify;