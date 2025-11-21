import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrgById } from "../RestAPI";

const CardDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getOrgById(id)
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Gagal memuat data organisasi:", err);
        setData(null);
      });
  }, [id]);

  if (!data) return <p className="text-center p-5">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <img 
        src={data.image} 
        alt={data.name} 
        className="rounded-2xl w-full max-w-md h-auto mx-auto mb-6 object-cover shadow-lg transition transform hover:scale-105 duration-300"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {Object.entries(data.pengurus).map(([role, value]) => (
          <div key={role} className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 flex flex-col transition hover:shadow-lg hover:scale-105 duration-300">
            <span className="font-semibold text-indigo-600">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            {Array.isArray(value) ? (
            value.map((v, idx) => (
              <p key={idx} className="text-gray-700 mt-1">{v}</p>
            ))
            ) : (
          <p className="text-gray-700 mt-1">{value || "Belum diisi"}</p>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default CardDetail;
