function Thumbnail(url, size) {
  if (url === null) {
    return "";
  }
  size = size === null ? "big" : size;
  const results = url.match("[\\?&]v=([^&#]*)");
  const video = results === null ? url : results[1];

  if (size === "small") {
    return "http://img.youtube.com/vi/" + video + "/2.jpg";
  }
  return "http://img.youtube.com/vi/" + video + "/0.jpg";
}

export default Thumbnail;
