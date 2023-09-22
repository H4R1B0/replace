import RoomPage from ".";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export default {
  title: "Page/RoomPage",
  component: RoomPage,
};
const queryClient = new QueryClient();

export const Default = {
  render: () => (
    <QueryClientProvider client={queryClient}>
      <RoomPage />
    </QueryClientProvider>
  ),
};
