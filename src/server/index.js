import express from "express";
import ViteExpress from "vite-express";
import play from "play-dl";
// import Thumbnail from "../client/utils/ytThumbnail";
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

const app = express();

app.get("/api/playlist/:id", async (req, res) => {
  const playlist = await play.playlist_info(
    "https://www.youtube.com/watch?v=EqELKFSgWCI&list=PLQyMFRMIxzVfrq5bGuxqu57tY24N9H-UI"
  );

  const filteredPlaylist = playlist.videos.map((song) => {
    return {
      id: song.id,
      url: song.url,
      title: song.title,
      authorName: song.channel.name,
      authorId: song.channel.id,
      imgUrl: song.thumbnails[0].url,
      duration: song.durationInSec,
    };
  });

  res.json(filteredPlaylist);
});

app.get("/api/track", async (req, res) => {
  console.log("Request");
  // Get the 'url' query parameter from the request object
  const url = req.query.url;

  console.log(url);

  // Check if the URL parameter is null or empty
  if (!url) {
    // URL parameter is null or empty, return an error
    return res
      .status(400)
      .json({ error: "URL parameter is empty or missing." });
  }

  try {
    const stream = await play.stream(url);
    const { video_details } = await play.video_info(url);
    const playUrl = stream.url;
    // id title authorName hqImgUrl
    res.json({
      id: stream.id,
      title: video_details.title,
      authorName: video_details.channel.name,
      hqImgUrl: Thumbnail(url),
      playUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(429).json(error);
  }
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
