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
  sequence: number;
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
    sequence: 1,
  });

  // 편지 작성 시, 입력된 내용에 따라 letter의 state 변경시키기
  const onChangeLetter = (e: any) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
      // writeTime: new Date().toISOString(),
    });
  };

  const BASE_URL = import.meta.env.VITE_APP_API_URL;

  // const userToken = sessionStorage.getItem("accessToken");
  const userToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiLtmITspIAiLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNjk2MDQ5MDI1fQ.o0J4hHjslvrCVx78menpOJ7X3QilPTrBpTkryI-fnSs";
  // api 불러오기.다른 곳으로 이동시킬 것
  useEffect(() => {
    fetch(`${BASE_URL}/letter/1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        // 에러 코드에 따른 상태 관리를 위해 추가
        if (!res.ok) {
          throw new Error(`${res.status} 에러 발생`);
        }
        console.log("결과", res);
        return res.json();
      })
      .then((data) => {
        setBooks(data.data);
        console.log(data.data, books);
      })
      .catch((err) => console.log(err));
  }, [letter, selectedBook]);

  useEffect(() => {
    if (selectedBook) {
      fetch(`${BASE_URL}/letter/detail/${selectedBook?.letterId}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedBook(data);
          console.log("선택한 책", data);
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
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(letter),
    })
      .then((res) => {
        console.log("res", res);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        } else {
          return res.json();
        }
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
          writeTime: "2023-09-05 14:30:00",
          sequence: 1,
        });
      })
      .catch((error) => {
        console.error("에러났음~~", error);
        // console.log(userToken);
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
                    <div onClick={() => setSelectedBook(book)}>
                      <TrributeEventCard key={book.letterId}>
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
