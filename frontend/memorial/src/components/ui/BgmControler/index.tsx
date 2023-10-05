import { useSound } from "use-sound";
import BGM from "@assets/Sounds/BGM Dream Culture.mp3";
import { useState } from "react";

export function BgmControler() {
  const [isPlaying, setIsPlaying] = useState(true);
  
  const [play, { stop }] = useSound(BGM, { volume: 0.1 });

  const playWithLoop = () => {
    play({ onend: playWithLoop });
  };

  const stopBGM = () => {
    stop();
  }

  const toggleBGM = () => {
    if (isPlaying) {
      stopBGM();
    } else {
      playWithLoop();
    }
    setIsPlaying(!isPlaying);
  };

  const nowState = () => {
    if (isPlaying) {
      playWithLoop();
    } else {
      stopBGM();
    }
  }

  nowState();

  return { toggleBGM, stopBGM, nowState, isPlaying };
}
