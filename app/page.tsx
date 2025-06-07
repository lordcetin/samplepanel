/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import AuthClient from "@/components/AuthClient/AuthClient";
import { ChartAreaStacked } from "@/components/Charts/AreaChart/AreaChart";
import { ChartBarHorizontal } from "@/components/Charts/BarChart/BarChart";
import { ChartLineDefault } from "@/components/Charts/LineChart/LineChart";
import PieChartDonut from "@/components/Charts/PieChart/PieChartDonut";
import { ChartRadialText } from "@/components/Charts/RadialChart/RadialChart";
import HoverBorderGradientDemo from "@/components/HoverBorder/HoverBorderGradient";
import Input from "@/components/Input/Input";
import InputThird from "@/components/Input/InputThird";
import { isEmpty } from "lodash";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  return (
    <>
    {!isEmpty(session?.user) ?
      <div className="flex-col items-center w-full overflow-x-hidden">
      <div className='absolute left-0 top-0 welcome w-full h-full'></div>
      <div className="flex justify-center items-center w-screen h-screen bg-grid-small-white fixed top-0 left-0"></div>
      <div className="flex-col items-center w-full relative mt-26 space-y-4">
        <div className="flex justify-center items-center w-full gap-x-4">
        <div className="flex items-center gap-x-4">
          <ChartRadialText/>
          <ChartRadialText/>
        </div>
        <div>
          <PieChartDonut/>
        </div>
        </div>
        <div className="flex justify-center items-center w-full relative gap-x-4">
          <ChartBarHorizontal/>
          <ChartAreaStacked/>
          <ChartLineDefault/>
        </div>
      </div>
    </div>
    
    : <div className="flex-col items-center w-full overflow-x-hidden">
      <div className='absolute left-0 top-0 welcome w-full h-full'></div>
      <div className="flex justify-center items-center w-screen h-screen bg-grid-small-white fixed top-0 left-0"></div>
      <div className="flex justify-center items-center w-full relative mt-26 space-y-4">
        <AuthClient/>
      </div>
    </div>
    }
    </>
  );
}
