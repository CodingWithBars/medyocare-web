"use client";

import VerifyComponent from "@/components/VerifyComponent";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyComponent/>
    </Suspense>
  );
}
