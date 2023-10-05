import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Modal from "@components/ui/Modal";
import Toast from "react-hot-toast";

import { logout, signout } from "@apis/user";
import { BgmControler } from "@components/ui/BgmControler";
import styles from "./SettingModal.module.css";
import bgmOnsrc from "@assets/Image/bgmon.png";
import bgmOffsrc from "@assets/Image/bgmoff.png";


type SettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const { toggleBGM, isPlaying } = BgmControler();

  const handleLogoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("nickname");
    },
    onError: () => {
      // console.log(error);
    },
  });

  const handleLogout = () => {
    handleLogoutMutation.mutate();
    onClose();
    navigate("/");
    Toast.success("로그아웃 되었습니다.", {
      duration: 3000,
    });
  };
  if (handleLogoutMutation.isLoading) {
  }
  if (handleLogoutMutation.isError) {
    Toast.error("로그아웃에 실패했습니다.", {
      duration: 3000,
    });
  }


  const handleSignoutMutation = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("nickname");
    },
    onError: (error) => {
      console.log(error);
      Toast.error("회원탈퇴에 실패했습니다.");
    },
  });

  const handleSignout = () => {
    const isConfirm = window.confirm("정말로 회원탈퇴 하시겠습니까?");

    if (isConfirm) {
      handleSignoutMutation.mutate();
      onClose();
      navigate("/");
      Toast.success("회원탈퇴 되었습니다.");
    } else {
      return;
    }
  };
  if (handleSignoutMutation.isError) {
    Toast.error("회원탈퇴에 실패했습니다.");
  }

  const bgmOn = <div className={styles.bgmSelector} onClick={toggleBGM}>
    <img className={styles.bgmImage} src={bgmOnsrc} alt="BGM On" />
    <p>BGM ON</p>
  </div>

  const bgmOff = <div className={styles.bgmSelector} onClick={toggleBGM}>
    <img className={styles.bgmImage} src={bgmOffsrc} alt="BGM Off" />
    <p>BGM OFF</p>
  </div>


  return (
    <Modal modalOpen={isOpen} onClose={onClose} buttonLabel="닫기">
      {isPlaying ? bgmOn : bgmOff }
      <div className={styles.aboutAccountSelector} onClick={handleLogout}>
        <p>로그아웃</p>
      </div>
      <div className={styles.aboutAccountSelector} onClick={handleSignout}>
        <p>회원탈퇴</p>
      </div>
    </Modal>
  );
}
