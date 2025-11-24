import { useEffect, useState } from "react";
import { getOrgById, updateOrg } from "../../RestAPI";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrg() {
  const { id } = useParams();
  const nav = useNavigate();

  const defaultPengurus = {
    ketua: { nama: "", image: "" },
    wakil: { nama: "", image: "" },
    sekretaris: { nama: "", image: "" },
    bendahara: { nama: "", image: "" },
    advisor: { nama: "", image: "" },
  };

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    pengurus: defaultPengurus,
  });

  useEffect(() => {
    getOrgById(id).then((data) => {
      const fixedPengurus = { ...defaultPengurus, ...data.pengurus };
      setForm({ ...data, pengurus: fixedPengurus });
    });
  }, [id]);

  /* -------------------- HANDLE INPUT ORGANISASI -------------------- */
  const handleBasicChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* -------------------- HANDLE NAMA PENGURUS -------------------- */
  const handlePengurusNama = (e, role) => {
    setForm({
      ...form,
      pengurus: {
        ...form.pengurus,
        [role]: { ...form.pengurus[role], nama: e.target.value },
      },
    });
  };

  /* -------------------- HANDLE FOTO URL PENGURUS -------------------- */
  const handlePengurusImageURL = (e, role) => {
    setForm({
      ...form,
      pengurus: {
        ...form.pengurus,
        [role]: { ...form.pengurus[role], image: e.target.value },
      },
    });
  };

  const save = async () => {
    await updateOrg(id, form);
    nav("/admin");
  };

  return (
    <div className="flex justify-center p-6 mt-24">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200">

        {/* BUTTON KEMBALI */}
        <button
          onClick={() => nav("/admin")}
          className="mb-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-xl shadow-md"
        >
          ← Kembali
        </button>

        {/* TITLE */}
        <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 drop-shadow-sm">
          Edit Organisasi
        </h1>

        {/* ---------------------- DATA ORGANISASI ---------------------- */}
        <div className="space-y-5 mb-12">
          <div>
            <label className="text-gray-700 font-semibold ml-1">Nama Organisasi</label>
            <input
              name="name"
              value={form.name}
              onChange={handleBasicChange}
              className="w-full p-3 border rounded-lg shadow-sm mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold ml-1">Foto Organisasi (URL)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleBasicChange}
              className="w-full p-3 border rounded-lg shadow-sm mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold ml-1">Deskripsi</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleBasicChange}
              className="w-full p-3 border rounded-lg shadow-sm bg-gray-50 mt-1 h-28"
            />
          </div>
        </div>

        {/* ---------------------- DATA PENGURUS ---------------------- */}
        <h2 className="text-3xl font-bold text-indigo-600 mb-6">Struktur Pengurus</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {Object.entries(form.pengurus).map(([role, data]) => (
            <div
              key={role}
              className="p-5 rounded-2xl bg-gradient-to-br from-white to-gray-100 border shadow hover:shadow-lg duration-200"
            >
              <h3 className="text-xl font-bold capitalize mb-4 text-gray-800">
                {role}
              </h3>

              {/* FOTO PREVIEW */}
              <img
                src={data.image || "/pengurus.jpg"}
                className="w-28 h-28 rounded-full object-cover mx-auto shadow-md border"
              />

              {/* INPUT FOTO URL */}
              <label className="text-sm font-medium mt-4 block text-gray-600">
                Foto (URL)
              </label>
              <input
                value={data.image}
                onChange={(e) => handlePengurusImageURL(e, role)}
                placeholder="https://contoh.com/foto.jpg"
                className="w-full p-2 border rounded bg-gray-50 shadow-sm mt-1"
              />

              {/* NAMA */}
              <label className="text-sm font-medium mt-4 block text-gray-600">
                Nama {role}
              </label>
              <input
                value={data.nama}
                onChange={(e) => handlePengurusNama(e, role)}
                placeholder={`Nama ${role}`}
                className="w-full p-2 border rounded bg-gray-50 shadow-sm mt-1"
              />
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={save}
          className="w-full py-3 mt-10 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-semibold rounded-xl shadow-md"
        >
          Simpan Perubahan
        </button>

      </div>
    </div>
  );
}
