import axios from "axios";
const GetComplaints = async () => {
  return await axios.get("/complaints");
};

const StoreComplaint = async (data) => {
  data = { name: "Abdul Rafay", dept: "DEEE", from: "Student" };
  return await axios.post("/complaints/store", data, {
    headers: { "ngrok-skip-browser-warning": "any" },
  });
};
export { GetComplaints, StoreComplaint };
