import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PiBellDuotone, PiGearDuotone } from "react-icons/pi";
import { LiaSearchSolid } from "react-icons/lia";

import PATH from "@constants/path";
import NotFoundPage from "@pages/NotFoundPage";
import "./App.css";

const MainPage = lazy(() => import("@pages/MainPage"));
const RoomPage = lazy(() => import("@pages/RoomPage"));
const TributePage = lazy(() => import("@pages/TributePage"));
const LibraryPage = lazy(() => import("@pages/LibraryPage"));
const PayphonePage = lazy(() => import("@pages/PayphonePage"));
const HousePage = lazy(() => import("@pages/HousePage"));
const SearchResultPage = lazy(() => import("@pages/SearchResultPage"));

export default function App() {
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
    <div className="viewport">
      <nav>
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
      </nav>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={PATH.ROOT} element={<MainPage />} />
            <Route path={PATH.MAIN} element={<MainPage />} />
            <Route path={PATH.ROOM} element={<RoomPage />} />
            <Route path={PATH.TRIBUTE} element={<TributePage />} />
            <Route path={PATH.LIBRARY} element={<LibraryPage />} />
            <Route path={PATH.PAYPHONE} element={<PayphonePage />} />
            <Route path={PATH.HOUSE} element={<HousePage />} />
            <Route path={PATH.SEARCH_RESULT} element={<SearchResultPage />} />
            <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}
