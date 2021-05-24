import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

function Player(props) {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [props.trackUri]);

  if (!props.accessToken) return null;
  return (
    <SpotifyPlayer
      token={props.accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={props.trackUri ? [props.trackUri] : []}
    />
  );
}

export default Player;
