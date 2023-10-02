import { useSound } from "use-sound";
import { useEffect } from "react";
import BGM from "@assets/Sounds/BGM Dream Culture.mp3";
import LightOn from "@assets/Sounds/LightOn.mp3";

export function playBGM() {
  const [play] = useSound(BGM, { volume: 0.25 });
  play();
  play({ onend: play });
}

export function playLightBGM() {
  const [play] = useSound(LightOn, { volume: 0.5 });
  useEffect(() => {
    play();
  }, [play]);
}
