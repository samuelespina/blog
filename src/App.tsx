import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "./components";
import { HomePage, Article, Search, Category } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/search/:id" element={<Search />}></Route>
            <Route path="/categoria/:id" element={<Category />}></Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

// localhost:8080/category/:category/id/:id
