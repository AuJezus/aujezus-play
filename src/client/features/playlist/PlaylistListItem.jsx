function PlaylistListItem({ song, selected, onClick }) {
  return (
    // className="grid grid-cols-[70px_1fr]"
    <li
      className={`transition-colors duration-300 flex items-center py-3 px-2 gap-2 divide-x-2 ${
        !selected ? "hover:bg-neutral-500/25" : "bg-neutral-400/50"
      }`}
      onClick={onClick}
    >
      <img
        className="w-[70px] h-[70px] object-cover"
        src={song.imgUrl}
        alt={`${song.title}, cover photo`}
      />
      <div className="flex flex-col w-full min-h-0 min-w-0 pl-1">
        <span className="text-neutral-200 font-bold text-md overflow-hidden truncate">
          {song.title}
        </span>
        <span className="text-neutral-400">{song.authorName}</span>
      </div>
    </li>
  );
}

export default PlaylistListItem;
