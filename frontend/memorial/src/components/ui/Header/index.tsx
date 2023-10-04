import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PATH from "@constants/path";
import styles from "./Header.module.css";

import { HiHome } from "react-icons/hi2";
import { LiaSearchSolid } from "react-icons/lia";
import { HiBars4 } from "react-icons/hi2";

import SettingModal from "@components/ui/Modal/SettingModal";

export default function Header() {
  const navigate = useNavigate();

  const [isSettingsModalOpen, setIsSettingsModalOpen] =
    useState<boolean>(false);

  return (
    <div className={styles.wrapper}>
      <button title="Notifications">
        <HiHome
          onClick={() =>
            navigate(`/house/${sessionStorage.getItem("nickname")}`)
          }
        />
      </button>
      <div className={styles.spacer}>
        <button title="Search" onClick={() => navigate(PATH.SEARCH_RESULT)}>
          <LiaSearchSolid />
        </button>
        <button title="Settings" onClick={() => setIsSettingsModalOpen(true)}>
          <HiBars4 className={styles.setting} />
        </button>
        <SettingModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
        />
      </div>
    </div>
  );
}
