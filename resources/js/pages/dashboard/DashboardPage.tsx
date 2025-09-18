import { usePage } from '@inertiajs/react'
import React from 'react'



const Dashboard = () => {
  const props= usePage().props as any
  return (
    <div>Hi Bro, {props.auth.user.name}</div>
  )
}

export default Dashboard