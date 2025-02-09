import React from 'react'
import dynamic from 'next/dynamic'
const LoginForm = dynamic(() => import('./_components'))

const Page = () => {
  return (
    <LoginForm/>
  )
}

export default Page