export type Room = {
  sequence: number;
  targetName: string | null;
};

export type RoomList = {
  nickname: string;
  rooms: Room[];
};
