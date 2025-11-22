import { useEffect, useState } from "react";
import { getOrgById, updateOrg } from "../../RestAPI";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrg() {
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    pengurus: {
      ketua: "",
      wakil: "",
      sekretaris: "",
      bendahara: "",
      advisor: ""
    }
  });

  useEffect(() => {
    getOrgById(id).then((data) => {
      setForm({
        ...data, // <-- INI WAJIB supaya name, image, description ikut masuk
        pengurus: {
          ...data.pengurus,
          advisor: Array.isArray(data.pengurus.advisor)
            ? data.pengurus.advisor.join(", ")
            : data.pengurus.advisor
        }
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      pengurus: {
        ...form.pengurus,
        [e.target.name]: e.target.value
      }
    });
  };

  const save = async () => {
    const updatedData = {
      ...form, // <-- PENTING: kirim semua field
      pengurus: {
        ...form.pengurus,
        advisor: form.pengurus.advisor.split(",").map((a) => a.trim())
      }
    };

    await updateOrg(id, updatedData);
    nav("/admin");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Struktur Pengurus</h1>

      <div className="space-y-3">
        {Object.keys(form.pengurus).map((key) => (
          <input
            key={key}
            name={key}
            value={form.pengurus[key]}
            onChange={handleChange}
            placeholder={key.toUpperCase()}
            className="w-full p-2 border rounded"
          />
        ))}

        <button
          onClick={save}
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}
