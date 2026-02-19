import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Admin() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  // While loading localStorage
  if (user === undefined) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  // Not admin → redirect
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

  // Admin allowed
  return (
    <div style={{ color: "white" }}>
      <h1>Admin Panel 🚀</h1>
    </div>
  );
}

export default Admin;
