import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PATH from "@constants/path";
import NotFoundPage from "@pages/NotFoundPage";
import "./App.css";
import { Toaster } from "react-hot-toast";
// import "@assets/fonts/font.css";
import { playBGM } from "@utils/useSound";
import Header from "@components/ui/Header";

const MainPage = lazy(() => import("@pages/MainPage"));
const RoomPage = lazy(() => import("@pages/RoomPage"));
const TributePage = lazy(() => import("@pages/TributePage"));
const TributeListPage = lazy(() => import("@pages/TributeListPage"));
const TributeDetailPage = lazy(() => import("@pages/TributeDetailPage"));
const CreateTributePage = lazy(() => import("@pages/CreateTributePage"));
const LibraryPage = lazy(() => import("@pages/LibraryPage"));
const PayphonePage = lazy(() => import("@pages/PayphonePage"));
const HousePage = lazy(() => import("@pages/HousePage"));
const SearchResultPage = lazy(() => import("@pages/SearchResultPage"));
const RedirectKakaoPage = lazy(() => import("@pages/RedirectKakaoPage"));
const NicknamePage = lazy(() => import("@pages/NicknamePage"));
const IntroductionPage = lazy(() => import("@pages/IntroductionPage"));

const PhotoViewModal = lazy(
  () => import("@components/ui/Modal/PhotoViewModal")
);
const PhotoUploadModal = lazy(
  () => import("@components/ui/Modal/PhotoUploadModal")
);
const PhotoGridModal = lazy(
  () => import("@components/ui/Modal/PhotoGridModal")
);
const DeleteRoomConfirmModal = lazy(
  () => import("@components/ui/Modal/DeleteRoomConfirmModal")
);
const AudioOptionModal = lazy(
  () => import("@components/ui/Modal/AudioOptionModal")
);
const AudioRecordModal = lazy(
  () => import("@components/ui/Modal/AudioRecordModal")
);
const AudioUploadModal = lazy(
  () => import("@components/ui/Modal/AudioUploadModal")
);
const AudioListModal = lazy(
  () => import("@components/ui/Modal/AudioListModal")
);
const RadioOptionModal = lazy(
  () => import("@components/ui/Modal/RadioOptionModal")
);
const AIOptionModal = lazy(() => import("@components/ui/Modal/AIOptionModal"));
const AITrainModal = lazy(() => import("@components/ui/Modal/AITrainModal"));
// const SettingModal = lazy(() => import("@components/ui/Modal/SettingModal"));

export default function App() {
  playBGM();
  function handleResize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Toaster />
      <div className="viewport">
        {/* <nav>
          <button title="Notifications">
            <PiBellDuotone />
          </button>
          <div className="spacer"></div>
          <button title="Search">
            <LiaSearchSolid />
          </button>
          <button title="Settings">
            <PiGearDuotone />
          </button>
        </nav> */}
        <Router>
          <Header />
          <Suspense
            fallback={
              <div className="loading-wrapper">
                <img
                  src="https://i.imgur.com/DVqUtaE.gif"
                  alt="loading"
                  style={{ width: "80%" }}
                />
              </div>
            }
          >
            <Routes>
              <Route path={PATH.ROOT} element={<MainPage />} />
              <Route path={PATH.MAIN} element={<MainPage />} />
              {/* <Route path="settings" element={<SettingModal />} /> */}
              <Route path={PATH.ROOM} element={<RoomPage />}>
                <Route path="photos" element={<PhotoGridModal />} />
                <Route
                  path="photos/:photoSequence"
                  element={<PhotoViewModal />}
                />
                <Route path="photos/upload" element={<PhotoUploadModal />} />
                <Route path="delete" element={<DeleteRoomConfirmModal />} />
                <Route path="audio" element={<AudioOptionModal />} />
                {/* TODO: audio 경로를 phone으로 수정하기 */}
                <Route path="audio/record" element={<AudioRecordModal />} />
                <Route path="audio/upload" element={<AudioUploadModal />} />
                <Route path="radio" element={<RadioOptionModal />} />
                <Route path="radio/list" element={<AudioListModal />} />
                <Route path="radio/ai" element={<AIOptionModal />} />
                <Route path="radio/list/ai/train" element={<AITrainModal />} />
              </Route>
              <Route path={PATH.TRIBUTE} element={<TributePage />} />
              <Route
                path={PATH.CREATETRIBUTE}
                element={<CreateTributePage />}
              />
              <Route path={PATH.TRIBUTELIST} element={<TributeListPage />} />
              <Route
                path={PATH.TRIBUTEDETAIL}
                element={<TributeDetailPage />}
              />
              <Route path={PATH.LIBRARY} element={<LibraryPage />} />
              <Route path={PATH.PAYPHONE} element={<PayphonePage />} />
              <Route path={PATH.HOUSE} element={<HousePage />} />
              <Route path={PATH.SEARCH_RESULT} element={<SearchResultPage />} />
              <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
              <Route
                path={PATH.REDIRECT_KAKAO}
                element={<RedirectKakaoPage />}
              />
              <Route path={PATH.NICKNAME} element={<NicknamePage />} />
              <Route path={PATH.INTRODUCTION} element={<IntroductionPage />} />
              <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Router>
      </div>
    </>
  );
}
