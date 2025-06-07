/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useRef, useState } from 'react'
import HoverBorderGradientDemo from '../HoverBorder/HoverBorderGradient'
import InputThird from '../Input/InputThird'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios'
type Props = {}

const AuthClient = (props: Props) => {
  const [error,setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')
    const password = formData.get('password')

    if(email && password) {
      await signIn('credentials',{
        redirectTo: `/` ,
        email: email,
        password,
      });
      setLoading(false)
      formRef.current?.reset();
    }
    setLoading(false)
  };

  const handleRegister = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')
    const password = formData.get('password')

    const form = {email,password}
    const { status } = await axios.post(`/api/login`,form)
    if(status === 200) {
      const result:any =  await signIn('credentials',{
        email,
        password,
        redirectTo:`/`
      });
      setLoading(false)
      formRef.current?.reset();
    }

    setLoading(false)
  };

  return (
    <>
    <HoverBorderGradientDemo>
      <div className="flex-col items-center w-[600px] h-96 p-10">
        <h1 className="text-2xl font-bold text-white/60">ADMIN LOGIN</h1>
        <div className="flex-col items-center w-full mt-10">
          <form ref={formRef} onSubmit={handleRegister}>
          <InputThird
          id="email"
          label="Email"
          onError={false}
          value={(e:any) => e?.target.value}
          name="email"
          type="text"
          />
          <InputThird
          id="password"
          label="Password"
          onError={false}
          value={(e:any) => e?.target.value}
          name="password"
          type="password"
          />
          <button type='submit' className='border dark:border-white/20 mt-5 border-black/20 py-2 w-full rounded-lg bg-linear-120 to-lime-950 via-sky-900 from-teal-950 hover:to-lime-700 hover:via-sky-600 hover:from-teal-600 to-80% transition-all from-30% cursor-pointer flex items-center gap-x-2 justify-center'>{loading && <AiOutlineLoading3Quarters size={22} className='animate-spin transition-all'/>} Login</button>
          </form>
        </div>
      </div>
    </HoverBorderGradientDemo>
    </>
  )
}

export default AuthClient