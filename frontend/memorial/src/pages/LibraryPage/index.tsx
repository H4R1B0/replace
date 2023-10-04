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
import toast from "react-hot-toast";
import { playBookBGM } from "@utils/effectSound";
import { useQueryClient } from "@tanstack/react-query";
import Pagination from "@components/ui/Pagination";
import { Bloom } from "@react-three/postprocessing";
import { Cloud, Sparkles, Environment } from "@react-three/drei";

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

  const useplayBookBGM = playBookBGM();
  const queryClient = useQueryClient();
  // 편지 작성 시, 입력된 내용에 따라 letter의 state 변경시키기
  const onChangeLetter = (e: any) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
      writeTime: getCurrentDateTime(),
    });
  };

  const nickname = sessionStorage.getItem("nickname");
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

  const successDelete = async () => {
    toast.success("삭제되었습니다."), { id: "successDelete" };
  };
  const successSubmit = async () => {
    toast.success("편지 작성이 완료되었습니다."), { id: "successSubmit" };
  };

  const deleteMutation = useMutation(deleteBook, {
    onSuccess: () => {
      successDelete();
      setSelectedBook(null); // 선택한 책을 삭제한 후 null로 설정
      queryClient.invalidateQueries(["books", roomSequence]);
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
      successSubmit();
      setLetter({
        title: "",
        content: "",
        writeTime: "",
        sequence: roomSequence,
      });
      queryClient.invalidateQueries(["books", roomSequence]);
    },
    onError: (error) => {
      console.error("작성 실패", error);
      toast.error("편지 작성에 실패했습니다."), { id: "failSubmit" };
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
      <Pagination prev="홈으로가기" prevPath={`/house/${nickname}`} />
      <Canvas
        flat
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 30, 50] }}
        style={{ touchAction: "none" }}
        className={styles.canvas}
      >
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={6}
        />
        <Stage environment="city" intensity={0.5} adjustCamera shadows={false}>
          <PresentationControls
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
                onLetterClick={() => {
                  useplayBookBGM();
                  setLetterModalOpen(true);
                }}
                onBookShelfClick={() => {
                  useplayBookBGM();
                  setBookModalOpen(true);
                }}
              />
            </Selection>
          </PresentationControls>
        </Stage>
        <Cloud
          scale={6}
          opacity={0.3}
          depth={-12} // Z-dir depth
          segments={20} // Number of particles
        />
        <Sparkles
          count={80}
          size={3}
          position={[0, 0.9, 0]}
          scale={[10, 10, 10]}
          speed={0.5}
        />
        <Environment preset="sunset" />
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
