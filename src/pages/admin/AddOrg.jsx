import { useState } from "react";
import { createOrg } from "../../RestAPI";
import { useNavigate } from "react-router-dom";

export default function AddOrg() {
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
    const newData = {
      ...form,
      pengurus: {
        ...form.pengurus,
        advisor: form.pengurus.advisor
          ? form.pengurus.advisor.split(",").map((a) => a.trim())
          : []
      }
    };

    await createOrg(newData);
    nav("/admin");
  };

  return (
    <div className="w-full flex justify-center pt-28 pb-10 px-6">
      {/* Card Container */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Tambah Organisasi Baru
        </h1>

        <div className="space-y-4">

          <input
            name="name"
            value={form.name}
            onChange={handleBasicChange}
            placeholder="NAMA ORGANISASI"
            className="w-full p-3 border rounded"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleBasicChange}
            placeholder="URL GAMBAR (boleh dikosongkan)"
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleBasicChange}
            placeholder="DESKRIPSI ORGANISASI"
            className="w-full p-3 border rounded"
          />

          {Object.keys(form.pengurus).map((key) => (
            <input
              key={key}
              name={key}
              value={form.pengurus[key]}
              onChange={handlePengurusChange}
              placeholder={key.toUpperCase()}
              className="w-full p-3 border rounded"
            />
          ))}

          <button
            onClick={save}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Simpan Organisasi
          </button>
        </div>
      </div>
    </div>
  );
}
