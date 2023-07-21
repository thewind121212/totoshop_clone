"use client";
import { SessionProvider } from "next-auth/react";
import ReduxProvider from "../../redux/Provider";
import React from "react";
import Queryprovider from "@/useQuery/index.query";

function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Queryprovider>
      <ReduxProvider>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </Queryprovider>
  );
}

export default AppProvider;
