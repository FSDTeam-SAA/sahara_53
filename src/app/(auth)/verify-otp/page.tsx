// app/(auth)/verify-otp/page.tsx
import React, { Suspense } from "react";
import VerifyOTP from "@/components/website/Auth/VerifyOTP";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
}
