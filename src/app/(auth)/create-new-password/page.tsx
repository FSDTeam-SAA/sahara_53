// app/(auth)/create-new-password/page.tsx
import CreateNewPassword from "@/components/website/Auth/CreateNewPassword";
import React, { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPassword />
    </Suspense>
  );
}
