import express from "express";
import ViteExpress from "vite-express";
import play from "play-dl";

const app = express();

app.get("/api/playlist/:id", async (req, res) => {
  const playlist = await play.playlist_info(
    "https://www.youtube.com/watch?v=EqELKFSgWCI&list=PLQyMFRMIxzVfrq5bGuxqu57tY24N9H-UI"
  );
  // url name artist length

  console.log(playlist.videos[1].thumbnails);

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
  // Get the 'url' query parameter from the request object
  const url = req.query.url;

  console.log();

  // Check if the URL parameter is null or empty
  if (!url) {
    // URL parameter is null or empty, return an error
    return res
      .status(400)
      .json({ error: "URL parameter is empty or missing." });
  }

  const stream = await play.stream(url);
  const playUrl = stream.url;
  console.log(playUrl);
  res.json({ playUrl });
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
