import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa"; // Make sure to install react-icons if you haven't

function MovieCard({ movies }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarks.includes(movies.id)) {
      setBookmarked(true);
    }
   
  }, []);

  const handleBookmarkClick = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (bookmarked) {
      const newBookmarks = bookmarks.filter((id) => id !== movies.id);
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
      setBookmarked(false);
    } else {
      bookmarks.push({ id: movies.id, watched: false, review: "" });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(true);
    }
  };

  return (
    <div className="relative">
      <div className="cursor-pointer" key={movies.id}>
        <Link to={`/movieinfo/${movies.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
            alt={movies.title}
          />
        </Link>
        <div
          className="absolute top-2 right-2"
          onClick={(e) => {
            e.preventDefault();
            handleBookmarkClick();
          }}
        >
          <FaBookmark
            className={`${bookmarked ? "text-red-500" : "text-white"}`}
          />
        </div>
        <p className="w-full text-white overflow-ellipsis line-clamp-2 mt-2">
          {movies.title}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
