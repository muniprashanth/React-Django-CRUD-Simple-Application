import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const notifyRed = () => toast.error("Error message", {
    autoClose: 3000,
  });
  
  const notifyGreen = () => toast.success("Success message", {
    autoClose: 3000,
  });
  
  const notifyBlue = () => toast.info("Info message", {
    autoClose: 3000,
  });

  const notifyWarning = () => toast.warn("Warning message", {
    autoClose: 3000,
  });

  return (
    <div>
      <Button onClick={notifyRed}>Show Red Toast</Button>{' '}
      <Button onClick={notifyGreen}>Show Green Toast</Button>{' '}
      <Button onClick={notifyBlue}>Show Blue Toast</Button>{' '}
      <Button onClick={notifyWarning}>Show Warning Toast</Button>{' '}

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
}

export default App;
