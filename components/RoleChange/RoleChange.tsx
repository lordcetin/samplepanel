/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {
  row:any;
  id:any;
}

const RoleChange = ({row,id}: Props) => {
  const router = useRouter()
  const [selectedRole,setSelectedRole] = useState(row)

  const handleChange = async (val:any) => {
    setSelectedRole(val)
    const formData = new FormData();
    formData.append("id",id)
    formData.append("role",val)
    const { data,status } = await axios.post('/api/roleChange',formData)
    console.log("data",data)
    if(status === 200){
      return router.refresh()
    }
  }

  return (
      <Select onValueChange={(val:any) => handleChange(val)}>
        <SelectTrigger className="w-[180px] capitalize">
          <SelectValue placeholder={selectedRole ? selectedRole : row.getValue("role")} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role Change</SelectLabel>
            <SelectItem value="ADMIN" className="capitalize">ADMIN</SelectItem>
            <SelectItem value="MODERATOR" className="capitalize">MODERATOR</SelectItem>
            <SelectItem value="EDITOR" className="capitalize">EDITOR</SelectItem>
            <SelectItem value="FINANCE" className="capitalize">FINANCE</SelectItem>
            <SelectItem value="USER" className="capitalize">USER</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
  )
}

export default RoleChange