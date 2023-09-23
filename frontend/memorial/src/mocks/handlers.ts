import { roomHandlers } from "@mocks/handlers/roomHandlers";
import { libraryHandlers } from "@mocks/handlers/libraryHandlers";
import { tributeHandlers } from "./handlers/tributeHandlers";
import { payphoneHandlers } from "./handlers/payphoneHandlers";

export const handlers = [
  ...roomHandlers,
  ...libraryHandlers,
  ...tributeHandlers,
  ...payphoneHandlers,
];
