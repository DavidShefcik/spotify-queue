import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "~/pages/Login";
import HomePage from "~/pages/Home";
import NotFoundPage from "~/pages/NotFound";

export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
