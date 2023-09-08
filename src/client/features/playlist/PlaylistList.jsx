import Thumbnail from "../../utils/ytThumbnail";
import PlaylistListItem from "./PlaylistListItem";

function PlaylistList({ playlist, onSongChange, currentSongInfo }) {
  async function handleSelect(i) {
    document.body.style.backgroundImage = `url(${Thumbnail(
      currentSongInfo.url
    )})`;
    onSongChange(i);
  }

  return (
    <ul className="overflow-y-auto flex-grow-0">
      {playlist.map((song, i) => (
        <PlaylistListItem
          song={song}
          key={song.id}
          selected={song.id === currentSongInfo.id}
          onClick={() => handleSelect(i)}
        />
      ))}
    </ul>
  );
}

export default PlaylistList;
