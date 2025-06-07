/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server"
import prismadb from '@/lib/prismadb'
import axios from "axios";
import bcrypt from 'bcrypt';
import { uid } from "uid";

export async function POST(request: Request) {

  try {

    const datas = await request.json();
    const email  = datas.email as string;
    const password  = datas.password as string;

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    const user = await prismadb.user.create({
      data: {
        email,
        role:"ADMIN",
        fullName:"Admin",
        accountNumber:String(uid(8)),
        adminStatus:"admin",
        phone:'',
        hashedPassword,
        memberId:"",
        expires:expirationDate,
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAYFBMVEUAAAD///+FhYXz8/P8/Pzq6uqioqJ2dnbw8PDi4uLT09NGRkba2trl5eX5+fkNDQ0gICATExNRUVFYWFixsbE6OjrMzMxoaGhgYGB8fHyTk5NtbW27u7ssLCwzMzOcnJyMk06eAAAEOElEQVR4nO3c2daaMBQFYEEChHmMDFHe/y0L1bb6q5AESQ72fHfeZS8yDx4OCCGEEEIIIYQQQgghhBBCCCE90myUmi7Favn50rety0du2/aXc266RKrSuhk4iwlxrJFDSMz40NR7/ER5YbP4aP1wjJld7O7zlFXk/0xy5UdVabp0UrKOvk5yRbvMdAnFeUEyl8WyksAzXUZBmU3mo0yIvYuPc66Wo0yqs+mSLrsIZhnTXEyXdUldOaJhnKo2Xdp5dbXQ9O8lsNNcZLJMaSDXtE64jt1qWme6xO/1sVwWy4p702V+5xLIZrGsAGpFs6UazFVimy71a6c3M8t5/sl0uV/JuWTrv3I4xBVBOTtRfo9CXBAMCi1mkgymS/6sZmpZLIvBmwd4AvP+1wi4tU3qqmaxLBfaHkehMGD+ERSmS/9DGamHiaD1Z57SiHnlA2s0qex8+Z7TwWo0XxXmLL5afhEG2N5GqDxkTlhouvwPwhU989g3Y5jNfFeYb2oz+bquGdb67KvGma8KczgpL2fGBQ20PY1izawZ2hKg5uphOLh1c6e4n2FZCbwN50Zxp8myaGO67E8y5XrGAZ5u2oprTR/ibnOo2J9FsOYyN2pdAMDmP7koTTYZ0AOa/unez7Ij1KMzhY0AaMv/O2fpisbAZhmnm5IntDG0Kea9tJWaB9AW2Nz/Ud5KfJu4hbXCfCKRBnyWqaYJLtMI7Dp2JZhmF1kO01RgcbxxoA78z/Iuno3jxMA2l+aFnLyN4xAOcqI8w6uC44tpdHIMKmAHZSLSsuMReVix+STiXbmPhv9TWjd2xxmjZEQZ4529z6cAN3lWh+HJblv7FIZ1tqdm/06ept8QAyGE9iEdB5GPOYUmR9TMcxn1jx/iU+Z6xjbRS06UD2VeSwg3dPdsWHGM+R4xcpl2WHG+PMcxkEbl4r8Y/c8DCuVTv2VU8+lzuuay3BKn0ttFy24qy9G8BT0oHMWIO2rtAy5qz0tEOVznrlq56q7cskDn0Kn+ikGM1rcOGAbDYJj/OMzWXTPVedWh3nrQ1Hk38KvCZHLv/mUlldatgG7biabea1vbdmeaX26qv5cVEWi+G7zlSjNx9WY59CueMi6JtV/a3rCeMd1ZDs12W00GLm1v9mn0f5jDodiodyZG3myoP2WYY+ie83nFK5P3uKErqFssBLTuy9xLmxXPmV6LGnOHZ59OExl9SvPZmmasjm2QxnSWsaaxD/XQCQPwXKt2P3LuRF0QbwKzfv3HSVgP5eVZ6EarljdO5AK6gnpu1tQ16jawXp5kpav6gM4todSwf7Lak287CfNqeFF+y+ou8MX/4dQPOqhJrtLQ4xFZ3FU7koh7Ri8xiUqLfqgCSn1ncvcpRgmhNKiGvthDkL/CpmzdSfTX9KvrywZQNywrLG52nAEhhBBCCCGEEEIIIYQQQgghhNCjX1ThRZhtPLJZAAAAAElFTkSuQmCC",
        emailVerified: new Date(),
        createdAt: new Date(),
        updated: new Date()
      }
    });

    const session = await prismadb.session.create({
        data: {
          sessionToken: Math.random().toString(36).substring(2) + Date.now(),
          fullName:"Admin",
          memberId:uid(11),
          ip:"",
          city:"",
          region:"",
          country:"",
          postal:"",
          timezone:"",
          location:"",
          profileId:user?.id,
          expires: expirationDate, // Oturumun süresi
          createdAt: new Date()
        },
    });

    return NextResponse.json("Successfull",{status:200})

  } catch (error) {
    console.log(JSON.stringify(error))
    return NextResponse.json({error:JSON.stringify(error)},{status:500})
  }
}