import { User } from "../models/user.models.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";
export async function searchPerson(req, res) {
    const { query } = req.params; // Extract query from params
    console.log("Query received:", query);

    try {
        // Fetch data from TMDB API
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        console.log("Response from TMDB:", response);

        if (!response || !response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Prepare the search history object
        const searchHistoryEntry = {
            id: response.results[0].id,
            image: response.results[0].profile_path || null, // Handle null image cases
            title: response.results[0].name || "Unknown",   // Handle missing name
            searchType: "person",
            createdAt: new Date(),
        };

        console.log("Updating user with search history:", searchHistoryEntry);

        // Update the user document
        await User.findByIdAndUpdate(req.user._id, {
            $push: { searchHistory: searchHistoryEntry },
        }, { new: true, runValidators: true }); // Ensure schema validation

        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in search controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
export async function searchMovie(req, res) {
    const { query } = req.params; // Extract the query parameter
    console.log("Query received:", query);

    try {
        // Fetch data from TMDB API
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
        );
        console.log("Response from TMDB:", response);

        // If no results found, send a 404 response
        if (!response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Create the search history entry
        const searchHistoryEntry = {
            id: response.results[0].id,
            image: response.results[0].poster_path || null, // Handle missing poster_path
            title: response.results[0].title || "Unknown",  // Handle missing title
            searchType: "movie",
            createdAt: new Date(),
        };

        console.log("Adding to search history:", searchHistoryEntry);

        // Update the user's search history in the database
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { searchHistory: searchHistoryEntry },
            },
            { new: true, runValidators: true } // Validate input and return updated document
        );

        // Send response with the results
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in searchMovie controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function searchTv(req, res) {
    const { query } = req.params; // Extract the query parameter
    console.log("Query received:", query);

    try {
        // Fetch data from TMDB API
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
        );
        console.log("Response from TMDB:", response);

        // If no results found, send a 404 response
        if (!response.results || response.results.length === 0) {
            return res.status(404).send(null);
        }

        // Create the search history entry
        const searchHistoryEntry = {
            id: response.results[0].id,
            image: response.results[0].poster_path || null, // Handle missing poster_path
            title: response.results[0].name || "Unknown",  // Handle missing name
            searchType: "tv",
            createdAt: new Date(),
        };

        console.log("Adding to search history:", searchHistoryEntry);

        // Update the user's search history in the database
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push: { searchHistory: searchHistoryEntry },
            },
            { new: true, runValidators: true } // Validate input and return updated document
        );

        // Send response with the results
        res.status(200).json({ success: true, content: response.results });
    } catch (error) {
        console.error("Error in searchTv controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getSearchHistory(req,res){
    try {
      res.status(200).json({success:true, content:req.user.searchHistory})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error "});
    }
}
export async function removeItemFromSearchHistory(req, res) {
    const { id } = req.params;  // Extract the 'id' from the URL params
    
    try {
        // Find the user and remove the item with the matching id from the searchHistory array
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,  // Use the logged-in user's ID
            {
                $pull: {
                    searchHistory: { id: id }  // Pull the item where the id matches
                }
            },
            { new: true }  // Return the updated user document
        );
        
        // If no user is found, send a 404 response
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "Item removed from search history" });
    } catch (error) {
        console.error("Error in removeItemFromSearchHistory controller:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
