import express from "express";
import ViteExpress from "vite-express";
import play from "play-dl";

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

app.get("/api/playlist/:query", async (req, res) => {
  const { query } = req.params;

  console.log(query);

  try {
    if (!query) {
      return res.status(400).json({ error: "Invalid query" });
    }

    const playlist = await play.playlist_info(query);

    if (!playlist || !playlist.videos || !Array.isArray(playlist.videos)) {
      return res
        .status(500)
        .json({ error: "Unable to fetch playlist information" });
    }

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
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.get("/api/track", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Invalid or missing URL parameter." });
  }

  try {
    const stream = await play.stream(url);
    const { video_details } = await play.video_info(url);
    const playUrl = stream.url;

    res.json({
      id: stream.id,
      title: video_details.title,
      authorName: video_details.channel.name,
      hqImgUrl: Thumbnail(url),
      playUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
