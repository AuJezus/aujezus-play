import { useEffect, useState } from "react";
import PlaylistList from "../features/playlist/PlaylistList";
import PlaylistPlayer from "../features/playlist/PlaylistPlayer";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSongPlayUrl, setCurrentSongPlayUrl] = useState("");
  const currentSongInfo = playlist[currentSongIndex] || {};

  useEffect(function () {
    async function fetchPlaylist() {
      const res = await fetch("/api/playlist/123");
      const json = await res.json();
      setPlaylist(json);
    }
    fetchPlaylist();
  }, []);

  useEffect(
    function () {
      async function fetchTrackUrl() {
        const res = await fetch(
          `/api/track?url=${encodeURIComponent(currentSongInfo.url)}`
        );
        const { playUrl } = await res.json();
        setCurrentSongPlayUrl(playUrl);
      }
      if (currentSongInfo.url) fetchTrackUrl();
    },
    [currentSongInfo.url]
  );

  return (
    <div className="grid grid-cols-[minmax(350px,_1fr)_3fr] grid-rows-1 h-full">
      <PlaylistList
        playlist={playlist}
        onSongChange={setCurrentSongIndex}
        currentSongInfo={currentSongInfo}
      />
      {playlist.length && (
        <PlaylistPlayer
          currentSongPlayUrl={currentSongPlayUrl}
          currentSongInfo={currentSongInfo}
        />
      )}
    </div>
  );
}

export default Playlist;
