import axios from "axios";
const Login = async (data) => {
  return await axios.post("/admin/login", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });
};

export { Login };
