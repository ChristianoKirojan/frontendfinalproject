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
        className="w-40 h-40 object-cover mx-auto mt-4 rounded-lg shadow-md"
      />
      <h1 className="text-4xl font-bold text-center mb-4">{org.name}</h1>

      {/* description array */}
      <div className="text-white text-lg text-center mb-6 flex flex-col gap-2 leading-relaxed">
        {org.description.map((d, idx) => (
          <p key={idx}>{d}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(org.pengurus).map(([role, value]) => (
          <div
            key={role}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg hover:scale-[1.02] duration-200"
          >
            <h3 className="font-semibold text-indigo-600 text-lg capitalize mb-2">
              {role}
            </h3>

            {/* Case 1: VALUE = OBJECT */}
            {typeof value === "object" && !Array.isArray(value) && (
              <div className="flex items-center gap-4">
                <img
                  src={value.image}
                  className="w-16 h-16 rounded-lg object-cover border shadow"
                  alt={value.nama}
                />
                <p className="text-gray-700 text-lg font-medium">
                  {value.nama}
                </p>
              </div>
            )}

            {/* Case 2: VALUE = ARRAY */}
            {Array.isArray(value) &&
              value.map((v, i) => (
                <div key={i} className="mt-3 flex items-center gap-4">
                  {/* Jika array berisi OBJECT */}
                  {typeof v === "object" ? (
                    <>
                      <img
                        src={v.image}
                        className="w-16 h-16 rounded-lg object-cover border shadow"
                        alt={v.nama}
                      />
                      <p className="text-gray-700 text-lg font-medium">
                        {v.nama}
                      </p>
                    </>
                  ) : (
                    /* Jika array berisi STRING */
                    <p className="text-gray-700">{v}</p>
                  )}
                </div>
              ))}

            {/* Case 3: VALUE = STRING */}
            {typeof value === "string" && (
              <p className="text-gray-700">{value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
