import { AuthProvider } from "@/context/AuthContext";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const withAuth = (Component: React.ComponentType) => {
  return function AuthWrappedComponent(props: any) {
    return (
      <AuthProvider>
         <ToastContainer />
        <Component {...props} />
      </AuthProvider>
    );
  };
};

export default withAuth;
