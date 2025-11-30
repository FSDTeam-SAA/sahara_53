// app/(auth)/login/page.tsx
"use client";

import React, { Suspense } from "react";
import Login from "@/components/website/Auth/Login";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
