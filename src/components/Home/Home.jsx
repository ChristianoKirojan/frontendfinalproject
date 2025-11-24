import { useEffect, useState } from "react";
import { getAllOrgs } from "../../RestAPI.jsx";
import CardItem from "../CardItem";

export default function Home() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const data = await getAllOrgs();
    setOrgs(data);
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-black/40 bg-blend-darken"
      style={{
        backgroundImage: "url('/uk.jpg')",
      }}
    >
      <div className="min-h-screen w-full bg-white/30">
        <div className="max-w-6xl mx-auto pt-[80px] py-24 px-6 bg-white/20 backdrop-blur-md rounded-xl">
          <h1 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-md">
            Organisasi Mahasiswa
          </h1>

          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgs.map((o) => (
                <CardItem key={o.id} item={o} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}