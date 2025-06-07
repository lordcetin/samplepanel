/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataTableDemo } from '@/components/DataTable/DataTable'
import React from 'react'
import prismadb from '@/lib/prismadb'

type Props = {}

const Users = async (props: Props) => {

  const data = await prismadb.user.findMany()

  return (
    <div className="flex-col items-center w-full overflow-x-hidden">
      <div className='absolute left-0 top-0 welcome w-full h-full'></div>
      <div className="flex justify-center items-center w-screen h-screen bg-grid-small-white fixed top-0 left-0"></div>
      <div className="flex-col items-center w-full relative mt-26 space-y-4 container mx-auto">
        <h1 className='text-3xl font-bold'>Users</h1>
        <DataTableDemo data={data}/>
      </div>
    </div>
  )
}

export default Users