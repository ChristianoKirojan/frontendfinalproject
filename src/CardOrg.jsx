import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrgBySlug } from "../RestAPI";

export default function CardDetail() {
  const { slug } = useParams();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    getOrgBySlug(slug).then(setOrg);
  }, [slug]);

  if (!org) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-xl">
        <img src={org.image} className="w-full rounded-xl mb-4" />
        <h1 className="text-3xl font-bold mb-3">{org.name}</h1>
        <p className="text-gray-700 text-lg">{org.description}</p>
      </div>
    </div>
  );
}
