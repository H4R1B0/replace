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
        <RoomPage />
        <Footer />
      </nav>
      <img
        src="https://plus.unsplash.com/premium_photo-1669920081527-1ee9e31f5129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=1600&q=60"
        alt=""
        width="100%"
      />
    </div>
  );
}

export default App;
