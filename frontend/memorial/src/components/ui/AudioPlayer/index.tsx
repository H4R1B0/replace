interface AudioProps {
  url: string;
}

export default function AudioPlayer({ url }: AudioProps) {
  return (
    <div>
      <audio controls src={url} />
    </div>
  );
}
