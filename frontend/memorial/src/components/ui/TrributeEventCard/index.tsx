import styles from "./TrributeEventCard.module.css";

export type cardProps = {
  variant?: string;
  children?: React.ReactNode; // 모달 내부에 들어갈 모든 내용 <Modal>해당 모달에 넣고 싶은 내용(=children)</Modal> 로 정의해서 사용하기
  onClick?: () => void;
};

export default function TrributeEventCard({
  onClick = () => {},
  variant = "regular",
  children,
  ...other
}: cardProps) {
  let variantClass;
  switch (variant) {
    case "regular":
      variantClass = styles.regular;
      break;
  }
  return (
    <div {...other} className={styles.wrapper}>
      <div className={variantClass}>{children}</div>
    </div>
  );
}
