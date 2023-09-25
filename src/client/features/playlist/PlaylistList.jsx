import { useParams } from "react-router-dom";
import PlaylistListItem from "./PlaylistListItem";
import Spinner from "../../ui/Spinner";
import { usePlaylist } from "./usePlaylist";
import Error from "../../pages/Error";

function PlaylistList({ currentIndex, onSelect }) {
  const { id } = useParams();
  const { playlist, isLoading, error } = usePlaylist(id);

  if (error) return <Error errorMsg={error} />;

  if (isLoading) return <Spinner />;

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
