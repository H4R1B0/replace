import styles from "./AudioPlayer.module.css";

interface AudioProps {
  url: string | null;
}

export default function AudioPlayer({ url }: AudioProps) {
  if (url === null) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <audio controls>
        <source src={url} />
      </audio>
    </div>
  );
}
