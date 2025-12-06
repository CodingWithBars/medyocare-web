"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem("session");

    if (!session) {
      router.replace("/login"); // ⬅ Redirect immediately
    } else {
      setIsChecking(false); // Allow page to load
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-700 text-lg">Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
