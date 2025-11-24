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
        ...data,
        pengurus: {
          ...data.pengurus,
          advisor: Array.isArray(data.pengurus.advisor)
            ? data.pengurus.advisor.join(", ")
            : data.pengurus.advisor
        }
      });
    });
  }, [id]);

  const handleBasicChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePengurusChange = (e) => {
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
      ...form,
      pengurus: {
        ...form.pengurus,
        advisor: form.pengurus.advisor
          ? form.pengurus.advisor.split(",").map((a) => a.trim())
          : []
      }
    };

    await updateOrg(id, updatedData);
    nav("/admin");
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Organisasi
        </h1>

        <div className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={handleBasicChange}
            placeholder="NAMA ORGANISASI"
            className="w-full p-2 border rounded"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleBasicChange}
            placeholder="URL GAMBAR (boleh dikosongkan)"
            className="w-full p-2 border rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleBasicChange}
            placeholder="DESKRIPSI ORGANISASI"
            className="w-full p-2 border rounded"
          />

          {Object.keys(form.pengurus).map((key) => (
            <input
              key={key}
              name={key}
              value={form.pengurus[key]}
              onChange={handlePengurusChange}
              placeholder={key.toUpperCase()}
              className="w-full p-2 border rounded"
            />
          ))}

          <button
            onClick={save}
            className="w-full py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Update
          </button>

        </div>

      </div>
    </div>
  );
}
