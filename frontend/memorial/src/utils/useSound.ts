import { useSound } from "use-sound";

import BGM from "@assets/Sounds/BGM Dream Culture.mp3";

export function playBGM() {
  const [play, { stop }] = useSound(BGM, { volume: 0.1 });

  const playWithLoop = () => {
    play({ onend: playWithLoop }); // 노래가 끝나면 다시 재생
  };

  const stopBGM = () => {
    stop();
  };

  playWithLoop(); // 처음에 BGM 재생 시작

  return { stopBGM };
}
