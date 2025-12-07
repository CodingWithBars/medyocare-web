"use client";

import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("session");
    if (saved) setSession(JSON.parse(saved));
  }, []);

  return {
    session,
    logout: () => {
      localStorage.removeItem("session");
      window.location.reload();
    }
  };
}
