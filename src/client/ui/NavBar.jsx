import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handlePlay() {
    const encodedUrl = encodeURIComponent(query);
    navigate("/playlist/" + encodedUrl);
  }

  return (
    <nav className="flex justify-between items-center px-10 py-2">
      <img className="w-28" src="/aujezus-play.svg" />

      <div className="space-x-7">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-neutral-300 hover:bg-neutral-50 focus:bg-neutral-50 rounded w-96"
          type="text"
        ></input>
        <button
          onClick={handlePlay}
          className="text-neutral-200 font-bold uppercase border-solid border-2 border-neutral-400 py-1.5 px-3 rounded hover:color-neutral-50"
        >
          play
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
