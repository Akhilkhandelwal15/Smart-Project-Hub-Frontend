import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // if it is true or not there then if i move out of the window then query will run again
      retry: false,
    },
  },
});

export default queryClient;