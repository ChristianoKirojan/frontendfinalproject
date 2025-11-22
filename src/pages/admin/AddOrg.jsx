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
    const dataToSend = {
      ...form,
      pengurus: {
        ...form.pengurus,
        advisor: form.pengurus.advisor.split(",").map((a) => a.trim())
      }
    };

    await createOrg(dataToSend);
    nav("/admin");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tambah Struktur Pengurus</h1>

      <div className="space-y-3">
        <input
          name="ketua"
          onChange={handleChange}
          placeholder="KETUA"
          className="w-full p-2 border rounded"
        />

        <input
          name="wakil"
          onChange={handleChange}
          placeholder="WAKIL"
          className="w-full p-2 border rounded"
        />

        <input
          name="sekretaris"
          onChange={handleChange}
          placeholder="SEKRETARIS"
          className="w-full p-2 border rounded"
        />

        <input
          name="bendahara"
          onChange={handleChange}
          placeholder="BENDAHARA"
          className="w-full p-2 border rounded"
        />

        <input
          name="advisor"
          onChange={handleChange}
          placeholder="ADVISOR (pisahkan dengan koma)"
          className="w-full p-2 border rounded"
        />

        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
