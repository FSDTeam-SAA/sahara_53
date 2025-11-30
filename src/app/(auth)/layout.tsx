import type { Metadata } from "next";
// import "../../../styles/globals.css";


export const metadata: Metadata = {
  title: "Welcome!",
  description:
    "Manage your orders, track shipments, and configure products easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="">
        {children}
      </div>
 
  );
}
