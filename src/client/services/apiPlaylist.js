export async function getPlaylist(id) {
  if (!id) throw new Error("Playlist id is empty");

  const res = await fetch(`/api/playlist/${id}`);
  const playlist = await res.json();

  return playlist;
}
