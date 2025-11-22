import axios from "axios";

const API_URL = "http://localhost:5001/organizations";

// GET semua data organisasi
export const getAllOrgs = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil semua data:", err);
    return [];
  }
};

// GET organisasi berdasarkan ID
export const getOrgById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Gagal mengambil data organisasi:", err);
    return null;
  }
};

// CREATE organisasi
export const createOrg = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (err) {
    console.error("Gagal menambah organisasi:", err);
    return null;
  }
};

// UPDATE organisasi
export const updateOrg = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Gagal mengupdate data organisasi:", err);
    return null;
  }
};

// DELETE organisasi
export const deleteOrg = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Gagal menghapus organisasi:", err);
    return null;
  }
};
