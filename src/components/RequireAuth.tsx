import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const RequireAuth: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0b] flex items-center justify-center">
        <div className="font-mono text-[#7fffb2] animate-pulse">VERIFYING_AUTH_CLEARENCE...</div>
      </div>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/amgl-3-10" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
