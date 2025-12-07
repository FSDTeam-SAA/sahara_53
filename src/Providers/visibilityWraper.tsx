"use client";

import Footer from "@/components/website/Common/Footer";
import { usePathname } from "next/navigation";
// import Footer from "@/components/shared/footer";
// import NewsletterSection from "@/components/shared/NewsletterSection";


const HIDDEN_ROUTES = [
    "/signup",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/verify",
    "/verify-otp",
    "/book"
];

export default function LayoutVisibilityWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const shouldHideLayout = HIDDEN_ROUTES.some((route) =>
        pathname.startsWith(route),
    );

    return (
        <>
         
            {children}
            {!shouldHideLayout && <Footer />}
        </>
    );
}