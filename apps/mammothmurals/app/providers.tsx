"use client";

import React from "react";
import { ReactLenis, useLenis } from "lenis/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactLenis root></ReactLenis>
      {children}
    </>
  );
}

export default Providers;
