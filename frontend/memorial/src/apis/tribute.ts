import { api, Header } from "./index";

type Wreath = {
  wreathId: number;
  title: string;
  subTitle: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
  allCount: number;
};

type WreathData = {
  data: Wreath[];
};

type WreathDetail = {
  wreathId: number;
  title: string;
  subTitle: string;
  description: string;
  startDate: string;
  endDate: string;
  flower: number;
  candle: number;
  ribbon: number;
};

type ReportDetail = {
  declarationType: number;
  declarationContent: string;
  wreathId: number;
};

type myTribute = {
  wreathId: number;
  wreathItem: string;
};

type Tribute = {
  title: string;
  subTitle: string;
  description: string;
  startDate: string;
  endDate: string;
};

export const fetchTributeList = async () => {
  return await api.get<WreathData>("/wreath", Header());
};

export const fetchMyTributeList = async () => {
  return await api.get<WreathData>("/wreath/me", Header());
};

export const fetchTributeDetail = async (wreathid: number) => {
  return await api.get<WreathDetail>(`/wreath/${wreathid}`, Header());
};

export const fetchReportDetail = async (report: ReportDetail) => {
  return await api.post("/wreath/declaration", report, Header());
};

export const updateTribute = async (myTribute: myTribute) => {
  return await api.put("/wreath", myTribute, Header());
};

export const createTribute = async (tribute: Tribute) => {
  return await api.post("/wreath", tribute, Header());
};
