/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const id:any = formData.get('id')
    const role:any = formData.get('role')

    const user = await prismadb.user.update({
      where:{
        id
      },
      data:{
        role
      }
    })

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}