import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PATH from "@constants/path";
import styles from "./Header.module.css";

import { HiHome } from "react-icons/hi2";
import { LiaSearchSolid } from "react-icons/lia";
import { HiBars4 } from "react-icons/hi2";
import { PiBellDuotone } from "react-icons/pi";
import SettingModal from "@components/ui/Modal/SettingModal";

export default function Header() {
  const navigate = useNavigate();

  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.spacer}>
        <button
          title="Notifications"
          onClick={() => navigate(PATH.NOTIFICATION)}
        >
          <PiBellDuotone size={27} className={styles.setting} />
        </button>
      </div>
      <button title="Notifications">
        <HiHome
          size={27}
          onClick={() =>
            navigate(`/house/${sessionStorage.getItem("nickname")}`)
          }
          className={styles.setting}
        />
      </button>
      <div className={styles.spacer}>
        <button title="Search" onClick={() => navigate(PATH.SEARCH_RESULT)}>
          <LiaSearchSolid size={27} className={styles.setting} />
        </button>
        <button title="Settings" onClick={() => setIsSettingsModalOpen(true)}>
          <HiBars4 size={27} className={styles.setting} />
        </button>
        <SettingModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      </div>
    </div>
  );
}
