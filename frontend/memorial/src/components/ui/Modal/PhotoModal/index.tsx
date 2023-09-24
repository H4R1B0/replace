import Modal from "..";
import type { ModalProps } from "..";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPhotoList, uploadSinglePhoto } from "@apis/photo";
import styles from "./PhotoModal.module.css";
import Button from "@components/ui/Button";
import { useRef, useState } from "react";
import { Photo, PhotoList } from "types/Photo";
import { HiPhoto } from "react-icons/hi2";

export default function PhotoModal({
  roomSequence,
  ...other
}: PhotoModalProps) {
  const {
    isLoading,
    isError,
    data: photoList,
  } = useQuery({
    queryKey: ["photoList", roomSequence],
    queryFn: () => fetchPhotoList(roomSequence),
  });

  const [operation, setOperation] = useState<Operation>(Operation.VIEW_GRID);

  if (isLoading) return "loading";
  if (isError) return `Error`;

  return (
    <Modal {...other} buttonLabel="close">
      <PhotoView photo={photoList?.photos[0]} />
      {/* <PhotoUpload roomSequence={roomSequence} /> */}
      {/* <PhotoGrid photoList={photoList} /> */}
    </Modal>
  );
}

function PhotoGrid({ onAdd, photoList }: PhotoGridProps) {
  const photos = photoList?.photos.map((photo) => (
    <img key={photo.photoId} src={photo.photoUrl} />
  ));
  return (
    <>
      <p>Photo grid</p>
      <Button onClick={onAdd}>+</Button>
      <div className={styles.photoGrid}>{photos}</div>
    </>
  );
}

function PhotoUpload({ roomSequence }: PhotoUploadProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const queryClient = useQueryClient();

  const uploadImageMutation = useMutation({
    mutationFn: uploadSinglePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["photoList", roomSequence] });
    },
  });

  const handlePreviewClick = () => {
    inputEl.current?.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setImageSrc(result as string);
    };
    reader.readAsDataURL(file);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const file = formData.get("photo") as File;
    uploadImageMutation.mutate({
      sequence: roomSequence,
      photo: file,
    });
  };

  return (
    <>
      <p>Photo upload</p>
      <form onSubmit={handleFormSubmit}>
        <div className={styles.uploadPreview} onClick={handlePreviewClick}>
          <HiPhoto />
          <img src={imageSrc} />
        </div>
        {/*image/* */}
        <input
          type="file"
          name="photo"
          accept=".jpg,.jpeg"
          style={{ visibility: "hidden" }}
          ref={inputEl}
          onChange={handleFileChange}
        />
        <Button disabled={imageSrc === ""}>Upload</Button>
      </form>
    </>
  );
}

function PhotoView({ photo }: PhotoViewProps) {
  return (
    <>
      <p>Photo view</p>
      <img src={photo.photoUrl} />
    </>
  );
}

type PhotoModalProps = {
  roomSequence: number;
} & ModalProps;

enum Operation {
  VIEW_GRID,
  VIEW_INDIVIDUAL,
  UPLOAD,
}

type PhotoGridProps = {
  photoList: PhotoList;
  onAdd: () => void;
};
type PhotoUploadProps = {
  roomSequence: number;
};
type PhotoViewProps = {
  photo: Photo;
};
