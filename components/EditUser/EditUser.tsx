/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { FiUserPlus } from 'react-icons/fi'
import { IoCloseOutline } from 'react-icons/io5'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import InputThird from '../Input/InputThird'
import { motion } from 'motion/react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import { FaUserEdit } from 'react-icons/fa'
type Props = {
  id:any;
}

const EditUser = ({id}: Props) => {
  const [editModal,setEditModal] = useState(false);
  const [error,setError] = useState(false)
  const [ loading, setLoading ] = useState(false);
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedRole,setSelectedRole] = useState("")
  const [users,setUsers] = useState<any>([])
  console.log("selectedRole",selectedRole)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get('/api/users')
      setUsers(data?.filter((u:any) => u?.id === id))
    }
    getUser()
  }, []);

  const handleRegister = async (event:any) => {
    setLoading(true)
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = formData.get('fullName')
    const email = formData.get('email')
    const password = formData.get('password')


    const form = {id,fullName,email,password}
    const { status } = await axios.post(`/api/editUser`,form)
    if(status === 200) {
      setLoading(false)
      setEditModal(false)
      formRef.current?.reset();
      return router.push('/users')
    }

    setLoading(false)
  };
  return (
    <>
    {editModal &&
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/50 z-[9999999] flex justify-center items-center'>
      <motion.div
      initial={{ y: "100%", opacity: 0.3 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-100%", opacity: 0.3 }}
      transition={{
        duration: 0.3,
        ease: [0.3, 0.0, 0.2, 1], // iOS benzeri easing
      }}
      className='flex-col items-center bg-neutral-900 w-3/6 border border-neutral-800 absolute bottom-0 min-h-96 h-[550px] rounded-t-3xl'>
        <div className='flex justify-between items-center w-full py-2 px-3'>
          <h1 className='p-2 text-xl font-bold'>Edit {users[0]?.fullName} User</h1>
          <IoCloseOutline className='cursor-pointer text-white/60 hover:text-white' size={23} onClick={() => setEditModal(false)}/>
        </div>
          <form ref={formRef} onSubmit={handleRegister} className='flex flex-col gap-4 p-20'>
            <InputThird
            label='Full Name'
            id='name'
            name='fullName'
            defaultValue={users[0]?.fullName}
            type='text'
            value={(e:any) => e.target.value}
            onError={false}
            />
            <InputThird
            label={'Email'}
            id='email'
            type='text'
            name='email'
            defaultValue={users[0]?.email}
            value={(e:any) => e.target.value}
            onError={error}
            />
            <InputThird
            label='Password'
            id='password'
            type='password'
            defaultValue=''
            name='password'
            value={(e:any) => e.target.value}
            onError={false}
            />

          <button
          type='submit'
          disabled={loading}
          className='bg-teal-950  py-3 rounded-md w-full mt-10 hover:bg-teal-700 transition-all text-white z-[999] cursor-pointer flex items-center justify-center gap-x-2'
          >
          <FaUserEdit/> Edit User {loading && <AiOutlineLoading3Quarters className='animate-spin'/>}
          
          </button>
          </form>
      </motion.div>
    </div>
    }
    <Button variant={"outline"} onClick={() => setEditModal(true)} className='cursor-pointer'><FaUserEdit /> Edit</Button>
    </>
  )
}

export default EditUser