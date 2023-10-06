declare module "audio-react-recorder" {
  type AudioReactRecorderProps = {
    state?: RecordState;
    type: string;
    backgroundColor?: string;
    foregroundColor?: string;
    canvasWidth?: string | number;
    canvasHeight?: string | number;
    onStop?: (data: AudioData) => void;
  };

  declare class AudioReactRecorder extends React.Component<AudioReactRecorderProps> {}

  export type AudioData = {
    blob: Blob;
    url: string;
    type: string;
  };

  export enum RecordState {
    START,
    PAUSE,
    STOP,
    NONE,
  }

  export default AudioReactRecorder;
}
