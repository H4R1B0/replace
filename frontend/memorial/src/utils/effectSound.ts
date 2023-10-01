import { useSound } from "use-sound";
import Alarm from "@assets/Sounds/Alarm.mp3";
import Click from "@assets/Sounds/ClickMain.mp3";
import Letter from "@assets/Sounds/Letter.mp3";
import LetterList from "@assets/Sounds/LetterList.mp3";

export function playClick() {
  const [play] = useSound(Click, { volume: 0.5 });
  play();
}
export function playAlarm() {
  const [play] = useSound(Alarm, { volume: 0.5 });
  play();
}

export function playLetter() {
  const [play] = useSound(Letter, { volume: 0.5 });
  play();
}
export function playLetterList() {
  const [play] = useSound(LetterList, { volume: 0.5 });
  play();
}
