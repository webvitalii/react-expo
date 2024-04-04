import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";
import TableAdvancedPage from "./pages/TableAdvancedPage";
import FormPage from "./pages/FormPage";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/table" element={<TablePage />} />
          <Route path="/table-advanced" element={<TableAdvancedPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
