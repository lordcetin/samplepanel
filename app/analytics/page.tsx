/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChartAreaInteractive } from '@/components/Charts/AreaChart/AreaChartFull'

import React from 'react'

type Props = {}

const Finance = (props: Props) => {
  return (
    <div className='w-full mt-20 flex justify-center items-center relative container mx-auto'>
      <ChartAreaInteractive/>
    </div>
  )
}

export default Finance