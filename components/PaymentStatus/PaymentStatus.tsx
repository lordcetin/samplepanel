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

const PaymentStatus = ({row,id}: Props) => {
  const router = useRouter()
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(row ? "Active" : "Deactive");

  const handleChange = async (val:any) => {
    setSelectedPaymentStatus(val === "true" ? "Active" : "Deactive")
    const formData = new FormData();
    formData.append("id",id)
    formData.append("status",val)
    const { data,status } = await axios.post('/api/paymentStatus',formData)
    console.log("data",data)
    if(status === 200){
      return router.refresh()
    }
  }

  return (
  <Select onValueChange={(val:any) => handleChange(val)}>
    <SelectTrigger className="w-[180px] capitalize">
      <SelectValue placeholder={selectedPaymentStatus ? selectedPaymentStatus : row.getValue("paymentStatus")} />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Role Change</SelectLabel>
        <SelectItem value="true" className="capitalize">Active</SelectItem>
        <SelectItem value="false" className="capitalize">Deactive</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
  )
}

export default PaymentStatus