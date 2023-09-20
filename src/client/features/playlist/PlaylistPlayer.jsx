import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "../../styles/audio.css";
import { useEffect, useRef, useState } from "react";
import Thumbnail from "../../utils/ytThumbnail";
import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../../services/apiPlaylist";
import { useParams } from "react-router-dom";
import { usePlaylist } from "../usePlaylist";
import { getTrack } from "../../services/apiTrack";
import Spinner from "../../ui/Spinner";

function getRandomIndex(playlist) {
  const randomIndex = Math.floor(Math.random() * playlist.length);
  return randomIndex;
}

function PlaylistPlayer({ currentIndex, onChange }) {
  // currentTrack - hqImageUrl, authorName, playUrl
  // onPlayNext
  // onPlayPrevious
  // currentTrack
  const { id } = useParams();
  const playerRef = useRef();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const history = useRef([0]);
  const historyIndex = useRef(0);
  const [shuffle, setShuffle] = useState(false);

  const { playlist, isLoading, error } = usePlaylist(id);

  const {
    data: track,
    isLoading: isLoadingTrack,
    error: errorTrack,
  } = useQuery({
    retry: true,
    enabled: !!playlist?.[currentIndex]?.url,
    queryKey: ["track", playlist?.[currentIndex]?.url],
    queryFn: () => getTrack(playlist?.[currentIndex]?.url),
  });

  function playNext() {
    let indexToPlay;

    // If end of history stack
    if (history.current.length - 1 === historyIndex.current) {
      history.current.push(
        shuffle ? getRandomIndex(playlist) : currentIndex + 1
      );
    }

    indexToPlay = history.current[++historyIndex.current];
    onChange(indexToPlay);
  }

  function playPrevious() {
    // Add new random index to the history if user tries to go back more than history holds
    if (historyIndex.current === 0) {
      history.current.unshift(getRandomIndex(playlist));
      historyIndex.current++;
    }

    const indexToPlay = history.current[--historyIndex.current];
    onChange(indexToPlay);
  }

  // if (isLoading || isLoadingTrack) return;

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading || isLoadingTrack ? (
        <Spinner />
      ) : (
        <>
          <img
            className={`w-96 h-96 object-cover mb-16 vinyl-mask ${
              isPlaying
                ? "animate-[spin_10s_linear_infinite_running]"
                : "animate-[spin_10s_linear_infinite_paused]"
            }`}
            src={track.hqImgUrl}
            alt={`${track.title}, cover photo`}
          ></img>
          <div className="flex flex-col items-center gap-8 mb-28">
            <span className="text-neutral-200 font-bold text-xl">
              {track.title}
            </span>
            <span className="text-neutral-400 font-semibold text-xl">
              {track.authorName}
            </span>
          </div>
        </>
      )}

      <div className="w-[75%]">
        <AudioPlayer
          onEnded={playNext}
          volume={volume}
          ref={playerRef}
          onVolumeChange={() =>
            setVolume(playerRef.current.audio.current.volume)
          }
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onClickNext={playNext}
          onClickPrevious={playPrevious}
          autoPlay
          src={track?.playUrl || ""}
          showSkipControls={true}
          showJumpControls={false}
          showFilledVolume={true}
          customAdditionalControls={[
            <svg
              className={`fill-neutral-400 hover:fill-neutral-50 transition-colors duration-300`}
              key={1}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              onClick={() => setShuffle((s) => !s)}
            >
              {!shuffle ? (
                <path d="M21 6h-5v2h4v9H4V8h5v3l5-4-5-4v3H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1z"></path>
              ) : (
                <>
                  <path d="M17 17h-1.559l-9.7-10.673A1 1 0 0 0 5.001 6H2v2h2.559l4.09 4.5-4.09 4.501H2v2h3.001a1 1 0 0 0 .74-.327L10 13.987l4.259 4.686a1 1 0 0 0 .74.327H17v3l5-4-5-4v3z"></path>
                  <path d="M15.441 8H17v3l5-3.938L17 3v3h-2.001a1 1 0 0 0-.74.327l-3.368 3.707 1.48 1.346L15.441 8z"></path>
                </>
              )}
            </svg>,
          ]}
        />
      </div>
    </div>
  );
}

export default PlaylistPlayer;
