import { useEffect, useState } from "react";
import { getAllOrgs, deleteOrg } from "../../RestAPI";
import { Link } from "react-router-dom";

export default function AdminList() {
  const [orgs, setOrgs] = useState([]);

  const loadData = async () => {
    const data = await getAllOrgs();
    setOrgs(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Hapus struktur pengurus organisasi ini?")) {
      await deleteOrg(id);
      loadData();
    }
  };

  return (
    <div className="mt-28 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-italic text-white">Daftar Organisasi</h1>

        <Link
          to="/admin/add"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tambah Organisasi
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b text-left">
            <th className="p-3 font-semibold">Organisasi</th>
            <th className="p-3 font-semibold">Ketua</th>
            <th className="p-3 font-semibold">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {orgs.map((org) => (
            <tr key={org.id} className="border-b">
              <td className="p-3">{org.name}</td>
              <td className="p-3">{org.pengurus?.ketua?.nama || "-"}</td>
              <td className="p-3 space-x-2">
                <Link
                  to={`/admin/edit/${org.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(org.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
