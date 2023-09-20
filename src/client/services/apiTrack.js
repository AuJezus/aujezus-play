export async function getTrack(url) {
  if (!url) throw new Error("Track url is empty");

  const res = await fetch(`/api/track?url=${encodeURIComponent(url)}`);
  if (!res.ok) throw new Error("Http error");

  const track = await res.json();
  return track;
}
