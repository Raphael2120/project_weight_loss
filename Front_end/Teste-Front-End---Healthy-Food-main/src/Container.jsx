import { Header } from "./components/header/Header";
import { Hero } from "./components/main/hero/HeroSection";
import { Footer } from "./components/footer/Footer";
import { BestRecipes } from "./components/main/ourBestRecipes/BestRecipes";
import { BestServices } from "./components/main/bestServices/BestServices";
import { Contact } from "./components/main/contact/Contact";
import { Blog } from "./components/main/blog/Blog";
import "./Container.css";
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';

function Container() {
    // Définir l'état de l'IMC ici
  const [imcValue, setImcValue] = useState(null);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/best-recipes" element={<BestRecipes setImcValueParent={setImcValue} imcValue={imcValue} />} />
        <Route path="/best-services" element={<Hero setImcValueParent={setImcValue} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Hero setImcValueParent={setImcValue} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Container;