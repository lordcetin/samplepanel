/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FiUserPlus } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InputThird from '../Input/InputThird'
import { motion } from 'motion/react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

type Props = {}

const AddUser = (props: Props) => {
  const [error,setError] = useState(false)
  const [ openModal,setOpenModal ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedRole,setSelectedRole] = useState("")
  console.log("selectedRole",selectedRole)

  const handleRegister = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const username = formData.get('username')
    const password = formData.get('password')


    const form = {fullName,email,username,password,role:selectedRole,paymentStatus:selectedPaymentStatus}
    const { status } = await axios.post(`/api/addUser`,form)
    if(status === 200) {
      setLoading(false)
      setOpenModal(false)
      formRef.current?.reset();
      return router.push('/users')
    }

    setLoading(false)
  };

  return (
    <>
    {openModal &&
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 z-[9999999] flex justify-center items-center'>
      <motion.div
      initial={{ y: "100%", opacity: 0.3 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.3, 0.0, 0.2, 1], // iOS benzeri easing
      }}
      className='flex-col items-center bg-neutral-900 w-3/6 border border-neutral-800 absolute bottom-0 min-h-96 h-[650px] rounded-t-3xl'>
        <div className='flex justify-between items-center w-full py-2 px-3'>
          <h1 className='p-2 text-xl font-bold'>Create a User</h1>
          <IoCloseOutline className='cursor-pointer text-white/60 hover:text-white' size={23} onClick={() => setOpenModal(false)}/>
        </div>
          <form ref={formRef} onSubmit={handleRegister} className='flex flex-col gap-4 p-20'>
            <InputThird
            label='Full Name'
            id='name'
            name='fullName'
            type='text'
            value={(e:any) => e.target.value}
            onError={false}
            />
            <InputThird
            label={'Email'}
            id='email'
            type='text'
            name='email'
            value={(e:any) => e.target.value}
            onError={error}
            />
            <InputThird
            label='Password'
            id='password'
            type='password'
            name='password'
            value={(e:any) => e.target.value}
            onError={false}
            />
          
          <div className='flex items-center gap-x-6'>
           <h1 className='text-white/60'>Select Authorization</h1>
          <Select onValueChange={(val:any) => setSelectedRole(val)}>
            <SelectTrigger className="w-[130px] capitalize">
              <SelectValue placeholder={"Role"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ADMIN" className="capitalize">ADMIN</SelectItem>
                <SelectItem value="MODERATOR" className="capitalize">MODERATOR</SelectItem>
                <SelectItem value="EDITOR" className="capitalize">EDITOR</SelectItem>
                <SelectItem value="FINANCE" className="capitalize">FINANCE</SelectItem>
                <SelectItem value="USER" className="capitalize">USER</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>

          <div className='flex items-center gap-x-6'>
           <h1 className='text-white/60'>Select Payment Status</h1>
            <Select onValueChange={(val:any) => setSelectedPaymentStatus(val)}>
              <SelectTrigger className="w-[130px] capitalize">
                <SelectValue placeholder={"Status"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true" className="capitalize">Active</SelectItem>
                  <SelectItem value="false" className="capitalize">Deactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <button
          type='submit'
          disabled={loading}
          className='bg-teal-950  py-3 rounded-md w-full mt-10 hover:bg-teal-700 transition-all text-white z-[999] cursor-pointer flex items-center justify-center gap-x-2'
          >
          <FiUserPlus/> Add User {loading && <AiOutlineLoading3Quarters className='animate-spin'/>}
          </button>
          </form>
      </motion.div>
    </div>
    }
    <Button onClick={() => setOpenModal(true)} variant="outline" className="cursor-pointer"><FiUserPlus/> Add User</Button>
    </>
  )
}

export default AddUser