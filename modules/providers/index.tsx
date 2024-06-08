"use client";
import { Provider } from "react-redux";

import { store } from "@/lib/store";
import TanstackProviders from "./react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TanstackProviders>
      <Provider store={store}>{children}</Provider>
    </TanstackProviders>
  );
}
