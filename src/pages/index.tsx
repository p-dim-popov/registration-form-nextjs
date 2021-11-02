import React from 'react'
import { NextPage } from 'next'

const Home: NextPage = () => {
  const { APP_NAME } = process.env

  return (
    <>
      Hello from <u>{APP_NAME}</u>.
    </>
  )
}

export default Home
