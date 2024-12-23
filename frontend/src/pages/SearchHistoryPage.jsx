import axios from 'axios';
import { useEffect, useState } from 'react';
import NavbarP from '../components/NavbarP';
import { SMALL_IMG_BASE_URL } from '../utils/constants';

function formatDate(datestring) {
    const date = new Date(datestring);
    if (isNaN(date)) return ''; // Handle invalid date
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formatter.format(date);
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get('/api/v1/search/history');
      
        setSearchHistory(res.data.content);
      } catch (error) {
      
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  // Function to remove an entry from the search history
  const removeSearchHistory = async (id) => {
    try {
      // You can send a delete request to the backend here if needed
      await axios.delete(`/api/v1/search/history/${id}`);
      
      // Filter the entry out from the state
      setSearchHistory(searchHistory.filter((entry) => entry.id !== id));
    } catch (error) {
  
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <NavbarP />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No Search History</p>
          </div>
        </div>
      </div>
    );
  }

 

  return (
    <div className="bg-black text-white min-h-screen">
      <NavbarP />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((entry) => (
            <div key={entry.id} className="bg-gray-800 p-4 flex items-start rounded relative">
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                <span className="text-white text-left">{entry.title}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.createAt)}
                </span>
              </div>
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === 'movie'
                    ? 'bg-red-600'
                    : entry.searchType === 'tv-show'
                    ? 'bg-blue-600'
                    : 'bg-green-600'
                }`}
              >
                {entry.searchType}
              </span>

              {/* Move the delete button to the bottom */}
              <div className="mt-4 w-full flex justify-end">
                <button
                  onClick={() => removeSearchHistory(entry.id)}
                  className="text-red-600 hover:text-white font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
