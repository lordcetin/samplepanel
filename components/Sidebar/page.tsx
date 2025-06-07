/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import Image from "next/image";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { FaArrowTrendUp, FaDice } from "react-icons/fa6";
import { MdOutlineWorkOutline } from "react-icons/md";
import { HiOutlineViewGridAdd, HiViewGridAdd } from "react-icons/hi";
import { PiSquaresFour } from "react-icons/pi";
import { RiNftLine } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { IoChevronForward } from "react-icons/io5";
import Logo from "../Logo/page";
import Link from "next/link";

import { CiChat2 } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { LuMessageSquareOff } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { LuReply,LuLogOut } from "react-icons/lu";
import { format } from 'date-fns';
import { IoSettingsOutline } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { GoBell } from "react-icons/go";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdInsertChart } from "react-icons/md";
import { BsFillGridFill } from "react-icons/bs";

type Props = {};
const DATE_FORMAT = 'd.MM.yyyy HH:mm';

const Sidebar = (props: Props) => {
  const {data:user}:any = useSession()
  const [screenHeight, setScreenHeight] = useState<any>(0);
  const [screenWidth, setScreenWidth] = useState<any>(0);
  const [message,setMessage] = useState([]);
  const [messages, setMessages] = useState(false)
  const [notification, setNotification] = useState(false)
  const [settings, setSettings] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [over, setOver] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useLayoutEffect(() => {
    const handleResize = () => {
      setScreenHeight(window?.innerHeight);
      setScreenWidth(window?.innerWidth);
    };

    // Set initial screen height
    setScreenHeight(window?.innerHeight);
    setScreenWidth(window?.innerWidth);

    // Listen to window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menu:any[] = [
    {title:"HOME",link:`/`,icon:<BsFillGridFill/>},
    {title:"USERS",link:`/users`,icon:<FaUser/>},
    {title:"FINANCE",link:`/finance`,icon:<BiSolidCoinStack/>},
    {title:"ANALYTICS",link:`/analytics`,icon:<MdInsertChart/>},
  ]

  const handleClick = (link:any) => {
    if(link?.startsWith('@')){
      switch (link) {
        case '@message':
          setMessages(true)
          break;
        case '@notification':
          setNotification(true)
          break;
      
        default:
          break;
      }
    }else{
      router.push(link)
    }
  }

  useEffect(() => {
    const getConversation = async () => {
      setIsPending(true)
      const res = await fetch(`/api/messages/getConversation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMessage(data)
      setIsPending(false)
    }
    getConversation();
  }, []);

  console.log("user",user)

  return (
    <>

    <aside onMouseLeave={() => {setOver(false),setSettings(false)}} className={`w-[75px] border-neutral-800  min-h-screen hover:w-[250px] no-scrollbar z-[999999] group box-content transition-all duration-300 no-scrollbar max-md:hidden`}>
    <div className="fixed group-hover:w-[250px] min-h-screen bg-black w-[75px] border-r border-neutral-800 box-content transition-all duration-300 no-scrollbar">
    <div className="border-b border-neutral-800 p-2 transition-all h-[75px] justify-center items-center flex bg-black">
    {/* <Image src={'/assets/logo.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-32 object-cover cursor-pointer"/> */}

      <div className="flex items-center relative w-full group-hover:hidden">
        <h1>ADMIN</h1>
        {/* <Link href='/' className="flex items-center relative w-full group-hover:hidden">
        <Image src={'/assets/icon.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-10 absolute left-2 object-cover cursor-pointer"/>
        <Image src={'/assets/shadow.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-12 right-[10px] animate-pulse absolute object-cover cursor-pointer flex group-hover:hidden"/>
        <Image src={'/assets/ball.png'} width={800} height={800} alt="lotterys.io Logo" className="w-5 bottom-0 right-3 animate-bounce absolute object-cover cursor-pointer flex group-hover:hidden"/>
        </Link> */}
      </div>
      <div className="flex items-center relative">
        <h1 className="group-hover:flex hidden">ADMIN</h1>
        {/* <Link href='/' className="flex items-center relative">
        <Image src={'/assets/logo.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-48 object-cover cursor-pointer hidden group-hover:flex"/>
        <Image src={'/assets/shadow.svg'} width={800} height={800} alt="lotterys.io Logo" className="w-12 right-0 animate-pulse absolute object-cover cursor-pointer hidden group-hover:flex"/>
        <Image src={'/assets/ball.png'} width={800} height={800} alt="lotterys.io Logo" className="w-6 bottom-6 right-1 animate-bounce absolute object-cover cursor-pointer hidden group-hover:flex"/>
        </Link> */}
      </div>
    </div>

    <nav className="overflow-y-auto no-scrollbar h-[calc(100%-75px)] relative overflow-x-hidden">
    
      <div className="px-4 text-md">
        <ul className="my-2 py-2 space-y-8 list-none">
        {messages === true && <div className="h-[38px] w-[1px] bg-linear-to-t to-transparent via-teal-300 from-transparent absolute top-[95px] right-0"></div>}
        {notification === true && <div className="h-[38px] w-[1px] bg-linear-to-t to-transparent via-teal-300 from-transparent absolute top-[165px] right-[0.1px]"></div>}
          {menu?.map((item:any,index:any) => {
            return (
              <Fragment key={index}>
              <li onClick={() => handleClick(item?.link)} key={index + 1}>
              {pathname === item?.link && <div className="h-[38px] w-[1px] bg-linear-to-t to-transparent via-teal-300 from-transparent absolute right-[0.1px]"></div>}

                <div className="transition-all my-2 flex items-center gap-x-2 capitalize hover:text-brand cursor-pointer pr-[4px] group/item text-neutral-500 overflow-hidden">
                  <div className={pathname === item?.link ? "grid w-[38px] h-[38px]  place-content-center rounded-md group-hover/item:text-teal-300 text-teal-300 text-2xl" : "grid w-[38px] h-[38px]  place-content-center rounded-md group-hover/item:text-teal-300 text-2xl"}>
                    {item?.icon}
                  </div>

                  <div className={pathname === item?.link ? `flex-1 group-hover:block whitespace-nowrap ml-4 group-hover/item:text-teal-300 text-teal-100` : "flex-1 group-hover:block whitespace-nowrap ml-4 group-hover/item:text-teal-300 "}>{item?.title}</div>
                  <div className={pathname === item?.link ? "w-[18px] group-hover/item:block transition-all group-hover/item:text-teal-300 text-teal-100" : "w-[18px] group-hover/item:block transition-all group-hover/item:text-teal-300 "}>
                    <IoChevronForward/>
                  </div>
                </div>
              </li>
              </Fragment>
            )
          })}

        </ul>

      </div>

    </nav>
    {user?.user &&
    <div className={`absolute bottom-0 left-0 w-full border-t border-white/20 bg-black flex-col items-center hover:bg-brandark transition-all z-[999999] py-3`}>
      
      <div className={`flex items-center justify-between group-hover:justify-normal w-full h-full gap-x-2 px-5 ${settings && "selft-start border-b border-white/20 pb-2"}`}>
        <div className="flex items-center gap-x-2 w-full">
        <div className="relative size-[50px] rounded-full overflow-hidden shrink-0 right-2 group-hover:left-0">
          <Link href={`/profile/${user?.user?.username}`}><Image src={user?.user?.image || null} fill alt="Profile Image" className="object-cover"/></Link>
        </div>
          <Link href={`/profile/${user?.user?.username}`} >
            <h1 className="text-sm font-semibold hidden group-hover:block">{user?.user?.fullName}</h1>
            <h1 className="text-sm font-semibold hidden group-hover:block text-white/60">{user?.user?.username}</h1>
          </Link>
        </div>
        <div>
          <BiChevronDown onClick={() => setSettings(!settings)} size={32} className={`hidden group-hover:block cursor-pointer hover:text-white/60 transition-all ${settings ? "rotate-180" : "rotate-0"}`}/>
        </div>
      </div>

      {settings &&
      <div className={`${settings ? "h-[150px]" : "h-[75px]"} flex-col items-center w-full transition-all`}>
        <div className="group-hover:flex items-center gap-x-2 hidden text-lg py-4 px-8 text-white/60 cursor-pointer hover:bg-black/30 border-b border-white/20"><IoSettingsOutline size={20}/> Setttings</div>
        <div onClick={() => signOut({redirectTo:`/`})} className="group-hover:flex items-center gap-x-2 hidden text-lg py-4 px-8 text-white/60 cursor-pointer hover:bg-red-950/30 border-b border-white/20"><LuLogOut size={20}/> Log Out</div>
      </div>
      }

    </div>
    }
    </div>
    </aside>
    </>
  );
};

export default Sidebar;
