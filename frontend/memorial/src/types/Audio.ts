export type Audio = {
  voiceId: number;
  registDate: string;
  voiceUrl: string;
};

export type AudioList = {
  voiceItems: Audio[];
  total: number;
};

export type AIAudioBySituation = {
  message: string;
  voiceFileUrl: string;
};

export type AI = {
  sequence: number;
  gender: string;
};
