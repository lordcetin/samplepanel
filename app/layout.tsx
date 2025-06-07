/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";
import { QueryProvider } from "@/components/QueryProvider";
import Navbar from "@/components/Navbar/page";
import Sidebar from "@/components/Sidebar/page";
import Footer from "@/components/Footer/page";
import { isEmpty } from "lodash";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";

const ggSans = localFont({
  src:[
    {path:"./_fonts/ggsansRegular.ttf",weight:'200'},
    {path:"./_fonts/ggsansMedium.ttf",weight:'400'},
    {path:"./_fonts/ggsansSemibold.ttf",weight:'500'},
    {path:"./_fonts/ggsansSemibold.ttf",weight:'500'},
    {path:"./_fonts/ggsansBold.ttf",weight:'600 900'},
  ],
  variable:"--font-gg"
})

export const metadata: Metadata = {
  title: "Sample Admin",
  description: "This sample admin description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <body
        className={cn(
      "font-sans antialiased dark:bg-[#0a110f] bg-white min-h-screen h-screen w-screen overflow-x-hidden dark:text-white selection:bg-teal-400 selection:text-black font-medium max-md:p-3",
      ggSans?.variable 
      )}
      >
        <QueryProvider>
        <SessionWrapper>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          
          <div className="flex ">
            {!isEmpty(session) && <Sidebar/>}
              <div className="flex-col items-center w-full bg-black">
                {!isEmpty(session) && <Navbar/>}
                  <section className=" flex-col flex items-center">
                  
                  {children}
                  </section>
                {/* <Footer/> */}
              </div>
          </div>
        </ThemeProvider>
        </SessionWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
