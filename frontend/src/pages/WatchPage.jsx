import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/movie/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailers();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (trailers.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-500">No trailers available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-gray-800 py-6 border-b">
          Watch Trailers
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {trailers.map((trailer) => (
            <div
              key={trailer.id}
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={trailer.name}
                className="w-full h-64 md:h-80 rounded-lg"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
