/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import { ThemeProvider } from "../theme-provider";

type Props = {};

const Footer = (props: Props) => {
  return (
  <div className="flex items-center w-full p-7 bg-neutral-950 z-[999]">
    <div className="flex items-center w-full container mx-auto">
    <ThemeProvider/>
    </div>
  </div>
  );
};

export default Footer;
