export type Room = {
  sequence: number;
  targetName: string | null;
};

export type RoomList = {
  rooms: Room[];
};

export type RoomTarget = {
  targetName: string;
};
