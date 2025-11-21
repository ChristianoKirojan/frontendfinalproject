  import { useEffect, useState } from "react";
  import { getAllOrgs } from "../../RestAPI.jsx";
  import CardItem from "../CardItem";
  import CardList from "../CardList";

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
      <div className="pt-20">
        <h1 className="text-3xl font-bold mb-6">Organisasi Mahasiswa</h1>

        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
        </div>) : 
        (<CardList>
            {orgs.map((o) => <CardItem key={o.id} item={o} />)}
          </CardList>
        )}
      </div>
    );
  }
