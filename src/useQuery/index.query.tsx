"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

//create query client
const queryClient = new QueryClient();

//create query provider

function Queryprovider({ children }: React.PropsWithChildren) {
  
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }
  
  export default Queryprovider;