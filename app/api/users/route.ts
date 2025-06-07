/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {

    const user = await prismadb.user.findMany()
    
    return NextResponse.json(user,{status:200})

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}