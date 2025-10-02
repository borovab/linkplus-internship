import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout, Home, Users, NotFound, AddUser } from "./pages/";
import { UsersProvider } from "./context/UsersContext"; 
import { UsersProfileComp } from "./components";

import React, { useState, useEffect } from "react";
import { Mosaic } from "react-loading-indicators";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f9fafb",
        }}
      >
        <Mosaic
          size={120}
          color="#3182ce"
          style={{ animation: "fadeColor 2s infinite alternate" }}
        />
      </div>
    );
  }

  return (
    <UsersProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UsersProfileComp />} />
            <Route path="add" element={<AddUser />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UsersProvider>
  );
}

export default App;
