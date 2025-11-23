import { useEffect, useState } from "react";
import {
  getAllOrgs,
  createOrg,
  updateOrg,
  deleteOrg,
} from "../api/RestAPI";

const CRUDPage = () => {
  const [orgs, setOrgs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);

  const loadData = async () => {
    const data = await getAllOrgs();
    setOrgs(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await updateOrg(editId, formData);
      setEditId(null);
    } else {
      await createOrg(formData);
    }

    setFormData({ name: "", image: "", description: "" });
    loadData();
  };

  const handleDelete = async (id) => {
    await deleteOrg(id);
    loadData();
  };

  const handleEdit = (org) => {
    setEditId(org.id);
    setFormData({
      name: org.name,
      image: org.image,
      description: org.description,
    });
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">CRUD Organizations</h1>

      <form onSubmit={handleSubmit} className="mb-10 space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Organization" : "Add Organization"}
        </button>
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map((org) => (
            <tr key={org.id}>
              <td className="border p-2">{org.id}</td>
              <td className="border p-2">{org.name}</td>
              <td className="border p-2">{org.description}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(org)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(org.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRUDPage;
