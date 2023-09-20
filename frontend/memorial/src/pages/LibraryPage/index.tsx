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

  // 편지 작성 시, 입력된 내용에 따라 letter의 state 변경시키기
  const onChangeLetter = (e: any) => {
    setLetter({
      ...letter,
      [e.target.name]: e.target.value,
      writeTime: new Date().toISOString(),
    });
  };

  // api 불러오기.다른 곳으로 이동시킬 것
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/letter/list")
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
  }, []);

  useEffect(() => {
    if (selectedBook) {
      fetch(`https://pokeapi.co/api/v2/letter/detail/${selectedBook?.letterId}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedBook(data.response);
          console.log(data.response);
        });
    }
  }, []);

  const letterSubmit = () => {
    fetch("letters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(letter),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setBooks((prevBooks) => [...prevBooks, data.response]);

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

  // const openModal = () => setBookModalOpen(true);
  // const closeModal = () => {
  //   setBookModalOpen(false);
  //   setSelectedLetter(null); // 선택된 편지 초기화
  // };

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
            snap
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
        <p>제목</p>
        <input type="text" name="title" onChange={onChangeLetter} />
        <p>내용</p>
        <input type="text" name="content" onChange={onChangeLetter} />
        <Button variant="regular" onClick={letterSubmit}>
          편지 작성하기
        </Button>
      </Modal>

      <Modal
        modalOpen={bookModalOpen}
        onClose={() => setBookModalOpen(false)}
        title="편지를 확인해보세요."
        buttonLabel="확인"
      >
        {!selectedBook ? (
          <div>
            {books.length === 0 ? (
              <p>작성된 편지가 없어요.</p>
            ) : (
              <ul>
                {books.map((book) => (
                  <li key={book.letterId} onClick={() => setSelectedBook(book)}>
                    {book.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div>
            <h2>{selectedBook?.title}</h2>
            <p>작성한 날짜 : {selectedBook?.writeTime}</p>
            <p>내용 : {selectedBook?.content}</p>
            <Button variant="regular" onClick={() => setSelectedBook(null)}>
              돌아가기
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
