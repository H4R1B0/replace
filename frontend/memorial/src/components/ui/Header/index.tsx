import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PATH from "@constants/path";
import styles from "./Header.module.css";

import { PiBellDuotone } from "react-icons/pi";
import { LiaSearchSolid } from "react-icons/lia";
import { HiBars4 } from "react-icons/hi2";

import SettingModal from "@components/ui/Modal/SettingModal";

export default function Header() {
  const navigate = useNavigate();

  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  const location = useLocation();
  if (location.pathname === "/") return null;

  return (
    <div className={styles.wrapper}>
      <button title="Notifications">
        <PiBellDuotone />
      </button>
      <div className={styles.spacer}></div>
      <button title="Search" onClick={() => navigate(PATH.SEARCH_RESULT)}>
        <LiaSearchSolid />
      </button>
      <button
        className={styles.setting}
        title="Settings"
        onClick={() => setIsSettingsModalOpen(true)}
      >
        <HiBars4 />
      </button>
      <SettingModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
}
