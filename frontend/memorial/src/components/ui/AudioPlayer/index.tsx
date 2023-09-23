interface AudioProps {
  url: string | null;
}

export default function AudioPlayer({ url }: AudioProps) {
  if (url === null) {
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
