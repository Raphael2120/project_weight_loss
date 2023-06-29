/* istanbul ignore file */
import { Header } from "./components/header/Header";
import { Hero } from "./components/main/hero/HeroSection";
import { Footer } from "./components/footer/Footer";
import { BestRecipes } from "./components/main/ourBestRecipes/BestRecipes";
import { BestServices } from "./components/main/bestServices/BestServices";
import { Contact } from "./components/main/contact/Contact";
import { Blog } from "./components/main/blog/Blog";
import "./Container.css";
import { Routes, Route } from 'react-router-dom';

function Container() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/best-recipes" element={<BestRecipes />} />
        <Route path="/best-services" element={<BestServices />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/" element={<Hero />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Container;