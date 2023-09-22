interface AudioProps {
  url: string | null;
}

export default function AudioPlayer({ url }: AudioProps) {
  if (!url) {
    return null;
  }

  return (
    <div>
      <audio controls>
        <source src={url} />
      </audio>
    </div>
  );
}
