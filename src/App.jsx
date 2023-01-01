import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from "./pages/Home";
import axios from "axios";
import AddComplaint from "./pages/AddComplaint";
function App() {
  axios.defaults.baseURL = "https://a89c-111-68-99-197.in.ngrok.io/api";
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-complaint" element={<AddComplaint />} />
            <Route path="*" element={<strong>Not Found</strong>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
