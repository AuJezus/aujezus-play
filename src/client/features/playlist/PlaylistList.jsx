import { useParams } from "react-router-dom";
import Thumbnail from "../../utils/ytThumbnail";
import { usePlaylist } from "../usePlaylist";
import PlaylistListItem from "./PlaylistListItem";

function PlaylistList({ currentIndex, onSelect }) {
  const { id } = useParams();
  const { playlist, isLoading, error } = usePlaylist(id);

  if (isLoading) return <p>Loading</p>;

  return (
    <ul className="overflow-y-auto flex-grow-0">
      {playlist.map((song, i) => (
        <PlaylistListItem
          song={song}
          key={song.id}
          selected={i === currentIndex}
          onClick={() => onSelect(i)}
        />
      ))}
    </ul>
  );
}

export default PlaylistList;
