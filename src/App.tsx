import React, { useState, useEffect, useRef } from "react";
import { Navbar, Footer } from "./components";
import { HomePage, Article, Search, Category, ResponsiveHome } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AOS from "aos";

const App = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    console.log(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route
              path="/"
              element={screenWidth > 768 ? <HomePage /> : <ResponsiveHome />}
            />
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
