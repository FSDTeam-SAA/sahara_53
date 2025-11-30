// app/(auth)/create-new-password/page.tsx
import React, { Suspense } from "react";
import ResetYourPassword from "@/components/website/Auth/ResetYourPassword";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetYourPassword />
    </Suspense>
  );
}
