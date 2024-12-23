import { useState } from "react";
import { useContentStore } from "../store/content"; 
import Navbar from "../components/NavbarP";
import { Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ORIGINAL_IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const BACKDROP_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setContentType(tab === "movie" ? "movie" : tab === "tv" ? "tv" : "person");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const res = await axios.get(
        `http://localhost:5173/api/v1/search/${activeTab}/${encodeURIComponent(searchTerm)}`
      );
      setResults(res.data.content);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No results found for your search");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const handleImageClick = async (result) => {
    try {
      // Send the clicked image to the backend to store it in the search history
      await axios.post("/api/v1/search/history", {
        name: result.title || result.name,
        image: result.poster_path || result.profile_path,
        createAt: new Date().toISOString(),
      });
      toast.success("Added to search history!");
    } catch (error) {
      console.error("Failed to add to search history", error);
      toast.error("Failed to add to search history.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>
        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.length > 0 ? (
            results.map((result) => (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <Link to={`/actor/${result.name}`} className="flex flex-col items-center" onClick={() => handleImageClick(result)}>
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={`/watch/${result.id}`} onClick={() => handleImageClick(result)}>
                    <img
                      src={BACKDROP_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No results found. Try a different search term.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
