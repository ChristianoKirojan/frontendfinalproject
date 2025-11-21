import axios from "axios";

const API_URL = "http://localhost:5001/organizations";

// GET semua data organisasi
export const getAllOrgs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// GET 1 organisasi berdasar ID
export const getOrgById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// CREATE organisasi
export const createOrg = async (data) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

// UPDATE organisasi
export const updateOrg = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

// DELETE organisasi
export const deleteOrg = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
