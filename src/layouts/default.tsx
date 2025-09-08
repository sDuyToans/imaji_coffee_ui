import React, { ReactElement } from "react";

import { Navbar } from "@/components/layouts/navbar.tsx";
import Footer from "@/components/layouts/footer.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
