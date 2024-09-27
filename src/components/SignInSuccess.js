import { useState, useEffect } from 'react';

const SignInSuccess = ({ show, setShow }) => {
  useEffect(() => {
    // Automatically hide the popup after 3 seconds
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show, setShow]);

  return (
    <div
      className={`fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-500 ${
        show ? 'animate-fadeIn' : 'animate-fadeOut'
      }`}
    >
      Sign-in successful!
    </div>
  );
};

export default SignInSuccess;
