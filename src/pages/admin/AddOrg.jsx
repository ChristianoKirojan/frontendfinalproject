import { useState } from "react";
import { createOrg } from "../../RestAPI";
import { useNavigate } from "react-router-dom";

export default function AddOrg() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: [""],
    pengurus: {
      ketua: { nama: "", image: "" },
      wakil: { nama: "", image: "" },
      sekretaris: { nama: "", image: "" },
      bendahara: { nama: "", image: "" },
      advisor: [{ nama: "", image: "" }]
    }
  });

  const handleBasicChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePengurusChange = (role, field, index = null) => (e) => {
    if (role === "advisor") {
      const newAdvisor = [...form.pengurus.advisor];
      newAdvisor[index][field] = e.target.value;
      setForm({ ...form, pengurus: { ...form.pengurus, advisor: newAdvisor } });
    } else {
      setForm({
        ...form,
        pengurus: {
          ...form.pengurus,
          [role]: { ...form.pengurus[role], [field]: e.target.value }
        }
      });
    }
  };

  const handleAddAdvisor = () => {
    setForm({
      ...form,
      pengurus: {
        ...form.pengurus,
        advisor: [...form.pengurus.advisor, { nama: "", image: "" }]
      }
    });
  };

  const save = async () => {
    await createOrg(form);
    nav("/admin");
  };

  return (
    <div className="min-h-screen w-full flex justify-center pt-20 pb-10 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">

        {/* BUTTON KEMBALI */}
        <button
          onClick={() => nav("/admin")}
          className="mb-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-md"
        >
          ← Kembali
        </button>

        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-wide drop-shadow-md">
          Tambah Organisasi Baru
        </h1>

        <div className="space-y-6">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="name"
              value={form.name}
              onChange={handleBasicChange}
              placeholder="Nama Organisasi"
              className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="image"
              value={form.image}
              onChange={handleBasicChange}
              placeholder="URL Gambar Organisasi"
              className="w-full p-4 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            name="description"
            value={form.description[0]}
            onChange={(e) => setForm({ ...form, description: [e.target.value] })}
            placeholder="Deskripsi Organisasi"
            className="w-full p-4 border rounded-xl shadow-sm h-32 focus:ring-2 focus:ring-blue-500"
          />

          {/* PENGURUS */}
          <h2 className="text-2xl font-bold text-gray-700 mt-5 mb-3">Pengurus</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["ketua", "wakil", "sekretaris", "bendahara"].map((role) => (
              <div key={role} className="p-4 border rounded-xl bg-gradient-to-br from-white to-blue-50 shadow-md">
                <input
                  value={form.pengurus[role].nama}
                  onChange={handlePengurusChange(role, "nama")}
                  placeholder={`Nama ${role.toUpperCase()}`}
                  className="w-full p-3 border rounded-lg shadow-sm mb-2 focus:ring-2 focus:ring-blue-400"
                />
                <input
                  value={form.pengurus[role].image}
                  onChange={handlePengurusChange(role, "image")}
                  placeholder={`URL Foto ${role.toUpperCase()}`}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          {/* ADVISOR */}
          <h2 className="text-2xl font-bold text-gray-700 mt-6 mb-3">Advisor</h2>
          <div className="space-y-4">
            {form.pengurus.advisor.map((adv, idx) => (
              <div key={idx} className="grid md:grid-cols-2 gap-4 p-4 border rounded-xl bg-green-50 shadow-md">
                <input
                  value={adv.nama}
                  onChange={handlePengurusChange("advisor", "nama", idx)}
                  placeholder={`Nama Advisor`}
                  className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                />
                <input
                  value={adv.image}
                  onChange={handlePengurusChange("advisor", "image", idx)}
                  placeholder={`URL Foto Advisor`}
                  className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-400"
                />
              </div>
            ))}
            <button
              onClick={handleAddAdvisor}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-md"
            >
              Tambah Advisor
            </button>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button
              onClick={() => nav("/admin")}
              className="w-full md:w-1/2 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 shadow-md"
            >
              Kembali
            </button>
            <button
              onClick={save}
              className="w-full md:w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-md"
            >
              Simpan Organisasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
