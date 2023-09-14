import "./App.css";
import { useEffect } from "react";
import { PiBellDuotone, PiGearDuotone } from "react-icons/pi";
import { LiaSearchSolid } from "react-icons/lia";
import RoomPage from "@pages/RoomPage";
import Footer from "@components/ui/Footer";

function App() {
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

        <Footer />
      </nav>
      <RoomPage />
    </div>
  );
}

export default App;
