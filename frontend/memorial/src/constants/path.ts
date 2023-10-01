const PATH: { [key: string]: string } = {
  ROOT: "/",
  MAIN: "/main",
  LOGIN: "/login",
  OAUTH: "/oauth",
  TRIBUTE: "/tribute/main",
  TRIBUTELIST: "/tribute/list",
  CREATETRIBUTE: "/tribute/create",
  TRIBUTEDETAIL: "/tribute/:wreathid",
  ROOM: "/room/:sequence",
  // View photos: "/room/:sequence/photos",
  // View single photo: "/room/:sequence/photos/:photoid",
  // Upload photo: "/room/:sequence/photos/upload",
  LIBRARY: "/library/:sequence",
  PAYPHONE: "/payphone/:nickname",
  HOUSE: "/house/:nickname",
  SEARCH: "/search",
  SEARCH_RESULT: "/search/result",
  ERROR_PAGE: "/error",
  NOT_FOUND: "*",
  REDIRECT_KAKAO: "/oauth/redirect",
  NICKNAME: "/nickname",
};

export default PATH;
