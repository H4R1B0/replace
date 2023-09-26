import { roomHandlers } from "@mocks/handlers/roomHandlers";
import { libraryHandlers } from "@mocks/handlers/libraryHandlers";
import { tributeHandlers } from "./handlers/tributeHandlers";
import { payphoneHandlers } from "./handlers/payphoneHandlers";
import { photoHandlers } from "./handlers/photoHandlers";
import { audioHandlers } from "./handlers/audioHandlers";

export const handlers = [
  ...roomHandlers,
  ...libraryHandlers,
  ...tributeHandlers,
  ...payphoneHandlers,
  ...photoHandlers,
  ...audioHandlers,
];
