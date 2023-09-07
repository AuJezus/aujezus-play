import Thumbnail from "../../utils/ytThumbnail";
import PlaylistListItem from "./PlaylistListItem";

function PlaylistList({ playlist, onSongChange, currentSong }) {
  function handleSelect(i) {
    document.body.style.backgroundImage = `url(${Thumbnail(
      playlist[currentSong].url
    )})`;
    onSongChange(i);
  }

  return (
    <ul className="overflow-y-auto flex-grow-0">
      {playlist.map((song, i) => (
        <PlaylistListItem
          song={song}
          key={song.id}
          selected={i === currentSong}
          onClick={() => handleSelect(i)}
        />
      ))}
    </ul>
  );
}

export default PlaylistList;
