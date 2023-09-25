import Library from "@components/3d/Library";
import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls } from "@react-three/drei";
import styles from "./LibraryPage.module.css";
import Modal from "@components/ui/Modal";
import { useState, useEffect } from "react";
import {
  Selection,
  EffectComposer,
  Outline,
} from "@react-three/postprocessing";
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
  roomUuid: string;
  userId: string;
};

export default function LibraryPage() {
  // 모달을 열기 위한 State
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [bookModalOpen, setBookModalOpen] = useState(false);

  // 저장된 편지들을 저장하는 곳.
  const [selectedBook, setSelectedBook] = useState<Book | null>();
  const [books, setBooks] = useState<Book[]>([]);

  // 편지 작성을 위한 데이터를 저장하는 곳.
  const [letter, setLetter] = useState<Letter>({
    title: "",
    content: "",
    writeTime: "",
    roomUuid: "12345",
    userId: "232134yi2",
  });
  console.log(letter);

  // 편지 작성 시, 입력된 내용에 따라 letter의 state 변경시키기
  const onChangeLetter = (e: any) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
      writeTime: new Date().toISOString(),
    });
  };

  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  // api 불러오기.다른 곳으로 이동시킬 것
  useEffect(() => {
    fetch(`${BASE_URL}/letter/list`)
      .then((res) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!res.ok) {
          throw new Error(`${res.status} 에러 발생`);
        }

        return res.json();
      })
      .then((data) => {
        setBooks(data.response);
      })
      .catch((err) => console.log(err));
  }, [letter, selectedBook]);

  useEffect(() => {
    if (selectedBook) {
      fetch(`${BASE_URL}/letter/detail/${selectedBook?.letterId}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedBook(data.response);
          console.log(data.response);
        });
    }
  }, []);

  const deleteLetter = () => {
    fetch(`${BASE_URL}/letter/${selectedBook?.letterId}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
    alert("삭제되었습니다.");
    setSelectedBook(null);
  };

  const letterSubmit = () => {
    fetch(`${BASE_URL}/letter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(letter),
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setBooks((prevBooks) => {
          const updatedBooks = [...prevBooks, data.response];
          console.log("Updated books:", updatedBooks);
          return updatedBooks;
        });

        setLetterModalOpen(false);

        alert("작성 완료");

        setLetter({
          title: "",
          content: "",
          writeTime: "",
          roomUuid: "12345",
          userId: "232134yi2",
        });
      })
      .catch((error) => {
        console.error("에러났음~~", error);
      });
  };

  const closeBookModal = () => {
    setBookModalOpen(false);
    setSelectedBook(null);
  };
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
      >
        <div className={styles.letterForm}>
          <div className={styles.letterFormTitle}>
            <p className={styles.letterTitle}>제목</p>
            <Input name="title" variant="short" onChange={onChangeLetter} />
          </div>
          <div className={styles.letterFormTitle}>
            <p className={styles.letterTitle}>내용</p>
            <Textarea
              name="content"
              variant="short"
              onChange={onChangeLetter}
            />
          </div>
          <div className={styles.button}>
            <Button variant="regular" onClick={letterSubmit}>
              편지 작성하기
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        modalOpen={bookModalOpen}
        onClose={closeBookModal}
        title="편지를 확인해보세요."
        buttonLabel="확인"
      >
        {!selectedBook ? (
          <div>
            {books.length === 0 ? (
              <p>작성된 편지가 없어요.</p>
            ) : (
              <div>
                {books.map((book) => {
                  if (!book) return null;

                  return (
                    <div onClick={() => setSelectedBook(book)}>
                      <TrributeEventCard key={book.letterId}>
                        {book.title}
                      </TrributeEventCard>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.letterForm}>
            <h2>{selectedBook?.title}</h2>
            <p>작성한 날짜 : {selectedBook?.writeTime}</p>
            <p>내용 : {selectedBook?.content}</p>
            <Button variant="regular" onClick={deleteLetter}>
              삭제하기
            </Button>
            <Button variant="regular" onClick={() => setSelectedBook(null)}>
              돌아가기
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
