/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
  <div className="flex items-center relative">
    <Image src={'/assets/logo.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-48 object-cover cursor-pointer"/>
    <Image src={'/assets/shadow.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-12 right-0 animate-pulse absolute object-cover cursor-pointer"/>
    <Image src={'/assets/ball.png'} width={800} height={800} alt="lotterys.io Logo" className="w-6 bottom-6 right-1 animate-bounce absolute object-cover cursor-pointer"/>
  </div>
  );
};

export default Logo;
