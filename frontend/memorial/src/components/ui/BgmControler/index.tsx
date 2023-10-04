import { useSound } from "use-sound";
import BGM from "@assets/Sounds/BGM Dream Culture.mp3";

export function BgmControler() {
  const [play, { stop, isPlaying }] = useSound(BGM, { volume: 0.1 });

  const playWithLoop = () => {
    play({ onend: playWithLoop });
  };

  const toggleBGM = () => {
    if (isPlaying) {
      stop();
    } else {
      playWithLoop();
    }
  };

  return { toggleBGM, isPlaying };
}
