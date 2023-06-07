"use client";

import { useState } from "react";
import type { Database, GenericProps } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const SupabaseProvider: React.FC<GenericProps> = ({ children }) => {
  const [client] = useState(() => createClientComponentClient<Database>());

  return (
    <SessionContextProvider supabaseClient={client}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
