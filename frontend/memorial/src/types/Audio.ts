export type Audio = {
  voiceId: number;
  registDate: string;
};

export type AudioList = {
  voiceItems: Audio[];
  total: number;
};
