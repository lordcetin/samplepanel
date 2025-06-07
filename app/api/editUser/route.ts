
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import axios from "axios";
import bcrypt from 'bcrypt';
import { uid } from "uid";
import { MemberRole } from "@prisma/client";
import { isEmpty } from "lodash";

export async function POST(request: Request) {

  try {

    const datas = await request.json();
    const id  = datas.id as string;
    const email  = datas.email as string;
    const password  = datas.password as string;
    const fullName  = datas.fullName as string;

    const existUser = await prismadb.user.findUnique({
      where:{
        id
      }
    })

    if(isEmpty(password)){

    const user = await prismadb.user.update({
      where:{
        id
      },
      data: {
        email: email || existUser?.email ,
        fullName: fullName || existUser?.fullName
      }
    });

    return NextResponse.json("Successfull",{status:200})

    }else{

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.update({
      where:{
        id
      },
      data: {
        email: email || existUser?.email ,
        fullName: fullName || existUser?.fullName,
        hashedPassword: hashedPassword || existUser?.hashedPassword
      }
    });

    return NextResponse.json("Successfull",{status:200})
    
    }

  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json({error:JSON.stringify(error)},{status:500})
  }
}