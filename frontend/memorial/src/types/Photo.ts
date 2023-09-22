export type Photo = {
  photoId: number;
  photoUrl: string;
  registDate: string;
};

export type PhotoList = {
  photos: Photo[];
  total: number;
};
