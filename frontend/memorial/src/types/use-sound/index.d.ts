declare module "use-sound";
{
  interface Options {
    volume?: number;
    playbackRate?: number;
    soundEnabled?: boolean;
    interrupt?: boolean;
    onend?: () => void;
    onload?: () => void;
  }

  type PlayFunction = (options?: Options) => void;

  export default function useSound(
    src: string,
    options?: Options
  ): [PlayFunction, { stop: () => void; isPlaying: boolean }];
}
