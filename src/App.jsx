import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import "./App.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Home from "./pages/Home";
import axios from "axios";
import AddComplaint from "./pages/AddComplaint";
import AdminLogin from "./pages/AdminLogin";
import ViewComplaint from "./pages/ViewComplaint";
import EditComplaint from "./pages/EditComplaint";
function App() {
  axios.defaults.baseURL =
    "https://cors-anywhere.herokuapp.com/https://3bb8-111-68-99-197.in.ngrok.io/api";
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="add-complaint" element={<AddComplaint />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="view-complaint/:id" element={<ViewComplaint />} />
            <Route path="edit-complaint/:id" element={<EditComplaint />} />
            <Route path="*" element={<strong>Not Found</strong>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
