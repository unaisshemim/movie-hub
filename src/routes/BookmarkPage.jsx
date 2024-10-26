import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function BookmarkPage() {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch movie details from the API
  const fetchMovieDetails = async (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTFmMGY4MjYxMTAzMDk1MTRiM2U5MjMxODY3NjE0ZSIsInN1YiI6IjY0ZDM1ZDZhMDM3MjY0MDBmZmZjN2M3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TpzrrzlL_IEwa7uovSoSWI_8fwByw8FbP0aCbMk_2Y0",
      },
    };
    try {
      const response = await axios.get(url, options);
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  // Function to toggle watched status
  const toggleWatched = (id) => {
    const updatedBookmarks = bookmarkedMovies.map((bookmark) => {
      if (bookmark.id === id) {
        const updatedBookmark = { ...bookmark, watched: !bookmark.watched };
        return updatedBookmark;
      }
      return bookmark;
    });
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Function to update movie review
  const updateReview = (id, review) => {
    const updatedBookmarks = bookmarkedMovies.map((bookmark) => {
      if (bookmark.id === id) {
        const updatedBookmark = { ...bookmark, review };
        return updatedBookmark;
      }
      return bookmark;
    });
    setBookmarkedMovies(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Fetch bookmarks from localStorage and then movie details
  useEffect(() => {
    const fetchBookmarks = async () => {
      const storedBookmarks = localStorage.getItem("bookmarks");

      if (storedBookmarks) {
        const bookmarkData = JSON.parse(storedBookmarks);
        const movieDetailsPromises = bookmarkData.map((bookmark) =>
          fetchMovieDetails(bookmark.id)
        );

        // Wait for all API calls to complete
        const movieDetails = await Promise.all(movieDetailsPromises);

        // Add movie details to each bookmark
        const updatedBookmarks = bookmarkData.map((bookmark, index) => ({
          ...bookmark,
          movieDetails: movieDetails[index],
        }));

        setBookmarkedMovies(updatedBookmarks);
      }
      setIsLoading(false);
    };

    fetchBookmarks();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="bg-black py-10">
        <p className="text-yellow-400 text-center pb-10 text-5xl font-bold">
          Bookmarks
        </p>

        <div className="container mx-auto p-4">
          {isLoading ? (
            <p className="text-yellow-400 text-center text-xl">Loading...</p>
          ) : bookmarkedMovies.length > 0 ? (
            <ul className="space-y-4">
              {bookmarkedMovies.map((bookmark, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition duration-200 flex space-x-4"
                >
                  {bookmark.movieDetails && (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/w200${bookmark.movieDetails.poster_path}`}
                        alt={bookmark.movieDetails.title}
                        className="w-24 h-36 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-yellow-400 text-lg font-semibold">
                          {bookmark.movieDetails.title}
                        </p>
                        <p className="text-gray-400">
                          {bookmark.movieDetails.genres
                            .map((genre) => genre.name)
                            .join(", ")}
                        </p>
                        <p className="text-gray-400">
                          Release Date: {bookmark.movieDetails.release_date}
                        </p>
                        <label className="mt-2 flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={bookmark.watched}
                            onChange={() => toggleWatched(bookmark.id)}
                            className="form-checkbox h-5 w-5 text-red-500"
                          />
                          <span className="text-white">Watched</span>
                        </label>
                        <div className="mt-2">
                          <label className="text-white">Review:</label>
                          <textarea
                            value={bookmark.review}
                            onChange={(e) =>
                              updateReview(bookmark.id, e.target.value)
                            }
                            placeholder="Add a review"
                            className="bg-gray-700 text-white p-2 rounded w-full mt-1 h-24"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-yellow-400 text-center text-xl">
              No bookmarks found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookmarkPage;
