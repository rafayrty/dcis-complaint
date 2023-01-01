import axios from "axios";
const GetComplaints = async () => {
  return await axios.get("/complaints");
};

const StoreComplaint = async (data) => {
  return await axios.post("/complaints/store", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
  });
};
export { GetComplaints, StoreComplaint };
