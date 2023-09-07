import { useEffect, useState } from "react";
import PlaylistList from "../features/playlist/PlaylistList";
import PlaylistPlayer from "../features/playlist/PlaylistPlayer";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(0);

  useEffect(function () {
    async function fetchPlaylist() {
      const res = await fetch("/api/playlist/123");
      const json = await res.json();
      setPlaylist(json);
    }
    fetchPlaylist();
  }, []);

  return (
    <div className="grid grid-cols-[minmax(350px,_1fr)_3fr] grid-rows-1 h-full">
      <PlaylistList
        playlist={playlist}
        onSongChange={setCurrentSong}
        currentSong={currentSong}
      />
      {playlist.length && (
        <PlaylistPlayer playlist={playlist} currentSong={currentSong} />
      )}
    </div>
  );
}

export default Playlist;
