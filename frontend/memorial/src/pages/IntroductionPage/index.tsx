import Slider from "@components/ui/slider";

export default function IntroductionPage() {
  const images = [
    {
      image: "https://i.imgur.com/gGcsKpe.png",
      title: "RePlace에 오신 것을 환영합니다.",
      description: "Description 1",
    },
    {
      image: "https://i.imgur.com/1WsoseI.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/ZFNNW7U.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/tawmD03.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/xxbcXca.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/inVKyu2.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/eSACUak.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/Ca64aLD.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/HFc4Nao.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
    {
      image: "https://i.imgur.com/UITKbH2.png",
      title: "Title 2dsdfghsdhghfhsdh",
      description: "Description 2",
    },
  ];
  return (
    <div>
      <Slider slides={images} />
    </div>
  );
}
