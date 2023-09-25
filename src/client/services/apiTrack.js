export async function getTrack(url) {
  try {
    if (!url) {
      throw new Error("Track URL is empty");
    }

    const encodedUrl = encodeURIComponent(url);
    const res = await fetch(`/api/track?url=${encodedUrl}`);

    if (!res.ok) {
      throw new Error("Bad request");
    }

    const track = await res.json();
    return track;
  } catch (error) {
    console.error("Error in getTrack:", error);
    throw error;
  }
}
