import Slider from "@components/ui/slider";

export default function IntroductionPage() {
  const images = [
    {
      image: "https://i.imgur.com/gGcsKpe.png",
      title: "RePlace에 오신 것을 환영합니다.",
      description: "각 집마다 소중한 기억을 저장해보세요.",
    },
    {
      image: "https://i.imgur.com/1WsoseI.png",
      title: "이곳은 당신의 방입니다!",
      description:
        "당신은 3개의 집을 소유하고 있습니다. 방에서는 무엇을 할 수 있을까요?",
    },
    {
      image: "https://i.imgur.com/ZFNNW7U.png",
      title: "액자에서 추억을 꺼내보세요.",
      description: "추억하고 싶은 사진을 담아 저장할 수 있습니다.",
    },
    {
      image: "https://i.imgur.com/tawmD03.png",
      title: "라디오에서 추억을 들어보세요.",
      description: "저장된 추억을 들을 수 있습니다.",
    },
    {
      image: "https://i.imgur.com/xxbcXca.png",
      title: "쓰레기통을 이용해보세요.",
      description:
        "방의 개수는 3개까지 입니다. 방을 원래대로 돌리고 싶다면 눌러보세요.",
    },
    {
      image: "https://i.imgur.com/1gYpzcf.png",
      title: "전화기에 추억을 기록해보세요.",
      description: "전화기를 통해 추억하는 사람의 음성을 기록할 수 있습니다.",
    },
    {
      image: "https://i.imgur.com/inVKyu2.png",
      title: "이곳은 서재입니다.",
      description: "서재에서는 무엇을 할 수 있을까요?",
    },
    {
      image: "https://i.imgur.com/eSACUak.png",
      title: "편지를 작성해보세요.",
      description:
        "추억하는 사람에게 편지를 남겨주세요.남긴 편지들도 추억이 됩니다.",
    },
    {
      image: "https://i.imgur.com/Ca64aLD.png",
      title: "책장에서 추억을 꺼내보세요.",
      description:
        "여러분이 남긴 기록을 모두 볼 수 있습니다. 차곡차곡 남긴 편지가 추억이 될거에요.",
    },
    {
      image: "https://i.imgur.com/HFc4Nao.png",
      title: "골목길을 방문해보세요.",
      description:
        "골목길에서는 방문한 사용자에게 음성 메시지를 남길 수 있습니다.",
    },
    {
      image: "https://i.imgur.com/UITKbH2.png",
      title: "헌화 공간에 방문해보세요.",
      description:
        "각각의 의미를 가지는 꽃, 초, 리본을 선택해 추모를 할 수 있습니다.",
    },
  ];
  return (
    <div>
      <Slider slides={images} />
    </div>
  );
}
