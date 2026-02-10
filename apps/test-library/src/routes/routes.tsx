import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import CssBuilder from "../pages/CssBuilder/CssBuilder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/css-builder" element={<CssBuilder />} />
    </Routes>
  );
};

export default AppRoutes;
