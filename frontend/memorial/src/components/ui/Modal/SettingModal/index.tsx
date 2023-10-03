import { useNavigate } from "react-router-dom";
// import { useQueryClient, useMutation } from "@tanstack/react-query";

import Modal from "@components/ui/Modal";
import Toast from "react-hot-toast";

// import { logout, signout } from "@apis/user";
import { BgmControler } from "@components/ui/BgmControler";

type SettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingModal({ isOpen, onClose }: SettingModalProps) {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const { toggleBGM, isPlaying } = BgmControler();

  // const handleLogoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //     sessionStorage.removeItem("accessToken");
  //     sessionStorage.removeItem("nickname");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     Toast.error("로그아웃에 실패했습니다.");
  //   },
  // });

  // const handleLogout = () => {
  //   handleLogoutMutation.mutate();
  //   onClose();
  //   navigate("/");
  //   Toast.success("로그아웃 되었습니다.");
  // };
  // if (handleLogoutMutation.isLoading) {
  //   Toast.loading("로그아웃 중...");
  // }
  // if (handleLogoutMutation.isError) {
  //   Toast.error("로그아웃에 실패했습니다.");
  // }

  const handleLog = () => {
    fetch(`${BASE_URL}/user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("nickname");
          onClose();
          Toast.success("로그아웃 되었습니다.");
          navigate("/");
        } else {
          Toast.error("로그아웃에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleSignoutMutation = useMutation({
  //   mutationFn: signout,
  //   onSuccess: () => {
  //     sessionStorage.removeItem("accessToken");
  //     sessionStorage.removeItem("nickname");

  //     Toast.success("회원탈퇴 되었습니다.");
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //     Toast.error("회원탈퇴에 실패했습니다.");
  //   },
  // });

  // const handleSignout = () => {
  //   handleSignoutMutation.mutate();
  //   onClose();
  //   navigate("/");
  // };
  // if (handleSignoutMutation.isLoading) {
  //   Toast.loading("회원탈퇴 중...");
  // }
  // if (handleSignoutMutation.isError) {
  //   Toast.error("회원탈퇴에 실패했습니다.");
  // }

  const handleSign = () => {
    fetch(`${BASE_URL}/user/me`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("nickname");
          onClose();
          Toast.success("함께해서 즐거웠습니다. 다시 만날 수 있기를...");
          navigate("/");
        } else {
          onClose();
          Toast.error("회원탈퇴에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal modalOpen={isOpen} onClose={onClose} buttonLabel="닫기">
        <button onClick={toggleBGM}>
          {isPlaying ? "BGM 끄기" : "BGM 켜기"}
        </button>
        <p onClick={handleLog}>로그아웃</p>
        <p onClick={handleSign}>회원탈퇴</p>
      </Modal>
    </div>
  );
}
