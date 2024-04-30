import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import FormPage from "./pages/FormPage";
import CarouselPage from "./pages/CarouselPage";
import CounterPage from "./pages/CounterPage";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/carousel" element={<CarouselPage />} />
          <Route path="/counter" element={<CounterPage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
