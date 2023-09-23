import { roomHandlers } from "@mocks/handlers/roomHandlers";
import { payphoneHandlers } from "./handlers/payphoneHandlers";

export const handlers = [...roomHandlers, ...payphoneHandlers];
