import { useEffect, useState } from "react";
import PlaylistList from "../features/playlist/PlaylistList";
import PlaylistPlayer from "../features/playlist/PlaylistPlayer";
import { usePlaylist } from "../features/usePlaylist";
import { useParams } from "react-router-dom";
import Thumbnail from "../utils/ytThumbnail";

function Playlist() {
  // current index
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();
  const { playlist, isLoading, error } = usePlaylist(id);

  useEffect(() => {
    if (!playlist) return;

    if (playlist[currentIndex]) {
      document.body.style.backgroundImage = `url('${Thumbnail(
        playlist[currentIndex].url
      )}')`;
    }
  }, [currentIndex, playlist]);

  function handleTrackChange(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="grid grid-cols-[minmax(350px,_1fr)_3fr] grid-rows-1 h-full">
      <PlaylistList onSelect={handleTrackChange} currentIndex={currentIndex} />
      <PlaylistPlayer currentIndex={currentIndex} />
    </div>
  );
}

export default Playlist;
