import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrgById } from "../RestAPI";

export default function CardDetail() {
  const { id } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    getOrgById(id)
      .then((data) => setOrg(data))
      .catch(() => setOrg(null));
  }, [id]);

  if (!org) return <p className="text-center p-5">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <img
        src={org.image}
        alt={org.name}
        className="rounded-2xl w-full max-w-lg h-auto mx-auto mb-6 object-cover shadow-lg hover:scale-105 duration-300"
      />

      {/* Judul */}
      <h1 className="text-4xl font-bold text-center mb-4">{org.name}</h1>

      {/* Deskripsi */}
      <p className="text-gray-700 text-lg text-center mb-6 leading-relaxed">
        {org.description}
      </p>

      {/* Grid Pengurus */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(org.pengurus).map(([role, value]) => (
          <div
            key={role}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg hover:scale-[1.02] duration-200"
          >
            <h3 className="font-semibold text-indigo-600 text-lg capitalize">
              {role}
            </h3>

            {/* Jika Array → tampilkan per paragraf */}
            {Array.isArray(value) ? (
              value.map((v, i) => (
                <p key={i} className="text-gray-700 mt-1">
                  {v}
                </p>
              ))
            ) : (
              <p className="text-gray-700 mt-1">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
