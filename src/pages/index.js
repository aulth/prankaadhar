import Aadhar from '@/components/Aadhar'
import Disclaimer from '@/components/Disclaimer'
import Form from '@/components/Form'
import Head from 'next/head'
import { Alert, TextField } from '@mui/material'
export default function Home() {
  return (
    <>
    <Head>
      <title>Prank Aadhar</title>
    </Head>
    <Disclaimer/>
    <Aadhar/>
    </>
  )
}