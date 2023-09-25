export async function getPlaylist(id) {
  try {
    if (!id) {
      throw new Error("Playlist ID is empty");
    }

    const res = await fetch(`/api/playlist/${encodeURIComponent(id)}`);

    if (!res.ok) {
      throw new Error("Bad request");
    }

    const playlist = await res.json();
    return playlist;
  } catch (error) {
    console.error("Error in getPlaylist:", error);
    throw error;
  }
}
