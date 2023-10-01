import Library from "@components/3d/Library";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";

import styles from "./LibraryPage.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchBookList,
  fetchBookDetail,
  createLetter,
  deleteBook,
} from "@apis/library";

import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import Textarea from "@components/ui/Textarea";
import TrributeEventCard from "@components/ui/TrributeEventCard";

type Book = {
  letterId: number;
  title: string;
  writeTime: string;
  content: string;
};

type Letter = {
  title: string;
  content: string;
  writeTime: string;
  sequence: number;
};

type BookList = {
  data: Book[];
};

export default function LibraryPage() {
  const { sequence } = useParams();
  const roomSequence = parseInt(sequence ?? "");
  // 모달을 열기 위한 State
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // 저장된 편지들을 저장하는 곳.
  const [selectedBook, setSelectedBook] = useState<Book | null>();
  const [books, setBooks] = useState<Book[]>([]);
  console.log(books);
  // 편지 작성을 위한 데이터를 저장하는 곳.
  const [letter, setLetter] = useState<Letter>({
    title: "",
    content: "",
    writeTime: "",
    sequence: roomSequence,
  });

  // 편지 작성 시, 입력된 내용에 따라 letter의 state 변경시키기
  const onChangeLetter = (e: any) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
      writeTime: getCurrentDateTime(),
    });
  };

  const { isError: isBookListError, error: bookListError } = useQuery<
    BookList,
    Error
  >(["books", roomSequence], () => fetchBookList(roomSequence), {
    enabled: !!roomSequence,
    onSuccess: (data) => {
      setBooks(data.data);
    },
  });

  if (isBookListError && bookListError) {
    console.error("Book List Fetch Error:", bookListError);
  }

  const { isError: isBookDetailError, error: bookDetailError } = useQuery<
    Book,
    Error
  >(
    ["bookDetail", selectedBook?.letterId],
    () => fetchBookDetail(selectedBook?.letterId!),
    {
      enabled: !!selectedBook,
      onSuccess: (data) => {
        setSelectedBook(data);
      },
    }
  );

  if (isBookDetailError && bookDetailError) {
    console.error("Book Detail Fetch Error:", bookDetailError);
  }

  // console.log(sessionStorage.getItem("accessToken"));
  const deleteMutation = useMutation(deleteBook, {
    onSuccess: () => {
      alert("삭제되었습니다.");
      setSelectedBook(null); // 선택한 책을 삭제한 후 null로 설정
    },
    onError: (error) => {
      console.error("Error deleting the book:", error); // 에러가 발생했을 때 콘솔에 로그 출력
    },
  });

  const deleteLetter = () => {
    if (selectedBook) {
      deleteMutation.mutate(selectedBook.letterId); // 선택한 책의 ID를 사용하여 뮤테이션 실행
    }
  };

  const createMutation = useMutation(createLetter, {
    onSuccess: () => {
      setLetterModalOpen(false);
      alert("작성 완료");
      setLetter({
        title: "",
        content: "",
        writeTime: "",
        sequence: roomSequence,
      });
    },
    onError: (error) => {
      console.error("작성 실패", error);
    },
  });

  const letterSubmit = () => {
    const newLetter = {
      ...letter,
      writeTime: getCurrentDateTime(),
    };
    console.log(newLetter);
    createMutation.mutate(newLetter); // 변형된 편지를 사용하여 뮤테이션을 실행합니다.
  };

  const closeBookModal = () => {
    setBookModalOpen(false);
    setSelectedBook(null);
  };

  console.log(letter);
  return (
    <div className={styles.wrapper}>
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 8] }}
        style={{ touchAction: "none" }}
      >
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
            snap // 삭제 시 확대한 채로 멈춤
            global
            zoom={1.5}
            rotation={[0, -Math.PI / 4, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor={0xffffff}
                  edgeStrength={100}
                  width={1000}
                />
              </EffectComposer>

              <Library
                onLetterClick={() => setLetterModalOpen(true)}
                onBookShelfClick={() => setBookModalOpen(true)}
              />
            </Selection>
          </PresentationControls>
        </Stage>
      </Canvas>

      <Modal
        modalOpen={letterModalOpen}
        onClose={() => setLetterModalOpen(false)}
        title="편지를 작성해보세요."
        buttonLabel="서재로 돌아가기"
        noButton={true}
      >
        <div className={styles.letter}>
          <div className={styles.letterFormTitle}>
            <p className={styles.letterTitle}>제목</p>
            <Input name="title" variant="regular" onChange={onChangeLetter} />
          </div>
          <div className={styles.letterFormTitle}>
            <p className={styles.letterTitle}>내용</p>
            <Textarea name="content" variant="long" onChange={onChangeLetter} />
          </div>
          <div className={styles.button}>
            <Button variant="regular" onClick={letterSubmit}>
              작성하기
            </Button>
            <Button variant="regular" onClick={() => setLetterModalOpen(false)}>
              돌아가기
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        modalOpen={bookModalOpen}
        onClose={closeBookModal}
        title={selectedBook ? selectedBook.title : "편지를 확인해보세요."}
        buttonLabel="서재로 돌아가기"
        noButton={selectedBook ? true : false}
      >
        {!selectedBook ? (
          <div className={styles.letter}>
            {books?.length === 0 ? (
              <p>작성된 편지가 없어요.</p>
            ) : (
              <div className={styles.listscrollwrapper}>
                {books?.map((book) => {
                  if (!book) return null;

                  return (
                    <div
                      onClick={() => setSelectedBook(book)}
                      key={book.letterId}
                    >
                      <TrributeEventCard>
                        <div className={styles.cardTitle}>{book.title}</div>
                        <div className={styles.cardDate}>
                          {formatDate(book.writeTime)}
                        </div>
                      </TrributeEventCard>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.letter}>
            <p className={`${styles.cardDate} ${styles.cardDateBig}`}>
              {selectedBook && formatDate(selectedBook.writeTime)}
            </p>
            <div className={styles.letterBody}>
              <p>{selectedBook?.content}</p>
            </div>
            <div className={styles.detailbutton}>
              <Button variant="regular" onClick={deleteLetter}>
                삭제 하기
              </Button>
              <Button variant="regular" onClick={() => setSelectedBook(null)}>
                리스트 보기
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function formatDate(isoDateString: string) {
  const date = new Date(isoDateString);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
}

function getCurrentDateTime() {
  const current = new Date();
  const year = current.getFullYear();
  const month = (current.getMonth() + 1).toString().padStart(2, "0");
  const day = current.getDate().toString().padStart(2, "0");
  const hours = current.getHours().toString().padStart(2, "0");
  const minutes = current.getMinutes().toString().padStart(2, "0");
  const seconds = current.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
