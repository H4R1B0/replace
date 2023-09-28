export type Audio = {
  voiceId: number;
  registDate: string;
  voiceUrl: string;
};

export type AudioList = {
  voiceItems: Audio[];
  total: number;
};
