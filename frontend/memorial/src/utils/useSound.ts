import { useSound } from "use-sound";
import BGM from "@assets/Sounds/BGM Dream Culture.mp3";

export function playBGM() {
  const [play] = useSound(BGM, { volume: 0.3 });
  play();
  play({ onend: play });
}
