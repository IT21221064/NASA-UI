import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";

import Innovations from "./../pages/Innovations/InnovationList";
import MarsPhotos from "./../pages/Mars/MarsPhotos";
import Login from "./../pages/Auth/Login";
import Registry from "./../pages/Auth/Registry";
import Welcome from "./../pages/Welcome/Welcome";
import { AnimatePresence } from "framer-motion";
import InnovationObj from "../pages/Innovations/InnovationObj";
import EPIC from "./../pages/Earth/EPIC";
import Footer from "./Footer";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/epic" element={<EPIC />} />
        <Route path="/ino" element={<Innovations />} />
        <Route path="/mars" element={<MarsPhotos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/innovation/:id" element={<InnovationObj />} />
      </Routes>
      <Footer />
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
