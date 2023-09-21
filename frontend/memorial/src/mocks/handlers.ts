import { roomHandlers } from "@mocks/handlers/roomHandlers";
import { libraryHandlers } from "@mocks/handlers/libraryHandlers";
import { tributeHandlers } from "./handlers/tributeHandlers";

export const handlers = [
  ...roomHandlers,
  ...libraryHandlers,
  ...tributeHandlers,
];
