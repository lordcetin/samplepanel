/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useRef, useState } from 'react'
import { signIn } from 'next-auth/react'
import axios from 'axios';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import InputThird from '../Input/InputThird';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';


type Props = {}

const Auth = (props: Props) => {
  const [error,setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams()
  const isLoginorRegister = searchParams?.get("state")
  const [ variant, setVariant ] = useState(isLoginorRegister == 'register' ? 'register' : 'login');
  const { theme } = useTheme();
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);


  const toggleVariant = useCallback(() => {
    setVariant((currentVarriant:any) => currentVarriant == 'login' ? 'register' : 'login')
  },[])


  const handleLogin = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email')
    const password = formData.get('password')

      await signIn('credentials',{
        redirectTo: '/',
        email,
        password,
      });
      setLoading(false)
      formRef.current?.reset();
    setLoading(false)
  };

  const handleRegister = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')


    const form = {fullName,email,username,password}
    const { status } = await axios.post(`/api/login`,form)
    if(status === 200) {
      const result:any =  await signIn('credentials',{
        email,
        password,
        redirectTo:`/client`
      });
      setLoading(false)
      formRef.current?.reset();
    }

    setLoading(false)
  };

  return (
    <>
    <div className={`flex justify-center items-center w-full`}>
      <div className="flex justify-center items-center w-full py-40 h-screen">
        <div className='flex justify-center items-center max-2xl:w-[500px] w-[700px] relative mt-2 rounded-t-2xl overflow-hidden'>
        <div className={`px-16 py-16 max-2xl:py-12 self-center z-50 rounded-t-2xl inset-shadow-2xs inset-shadow-white/30 w-[700px] max-2xl:w-[500px] relative overflow-hidden border-x border-white/10 `}>
          <h2 className='text-4xl mb-8 font-semibold text-white z-50 block'>
            {variant == 'login' ? 'Sign in' : 'Register'}
          </h2>
          <form ref={formRef} onSubmit={isLoginorRegister === 'register' || variant == 'register' ? handleRegister : handleLogin} className='flex flex-col gap-4'>
            {variant == 'register' && (
              <>
              <InputThird
              label='Full Name'
              defaultValue=''
              id='name'
              name='fullName'
              type='text'
              value={(e:any) => e.target.value}
              onError={false}
              />
              </>
            )}
            <InputThird
            label={variant == 'register' ? 'Email' : 'Username/Email'}
            id='email'
            defaultValue=''
            type='text'
            name='email'
            value={(e:any) => e.target.value}
            onError={error}
            />
            <InputThird
            label='Password'
            id='password'
            defaultValue=''
            type='password'
            name='password'
            value={(e:any) => e.target.value}
            onError={false}
            />

          <button
          type='submit'
          disabled={loading}
          className='bg-teal-950  py-3 rounded-md w-full mt-10 hover:bg-teal-700 transition-all text-white z-[999] cursor-pointer flex items-center justify-center gap-x-2'
          >
          {variant == 'login' ? "Login" : "Register"} {loading && <AiOutlineLoading3Quarters className='animate-spin'/>}
          </button>
          </form>

          <p className='text-neutral-500 mt-12 text-sm'>
            {variant == 'login' ? "First time using?" : "Already have an account?"}
            <span onClick={toggleVariant} className=' text-teal-500 ml-1 hover:underline cursor-pointer'>
              {variant == 'login' ? "Create an account" : "Login"}
            </span>
          </p>
        </div>
          <div className='absolute border top-0 left-0 w-[700px] h-[700px] max-2xl:w-[500px] bg-gradient-to-t to-teal-950/20 from-transparent from-40% blur-2xl z-0 rounded-t-2xl pointer-events-none overflow-hidden '></div>
        </div>
      </div>

    </div>
    </>
  )
}

export default Auth