import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<strong>Not Found</strong>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
