"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";


export default function HoverBorderGradientDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-3xl"
        as="div"
        className="dark:bg-sky-950/3 bg-white text-black dark:text-white flex items-center space-x-2"
      >
        {children}
      </HoverBorderGradient>
    </div>
  );
}

