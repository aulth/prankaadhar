import Aadhar from '@/components/Aadhar'
import Disclaimer from '@/components/Disclaimer'
import Form from '@/components/Form'
import Head from 'next/head'
import { Alert, TextField } from '@mui/material'
export default function Home({ipAddress}) {
  return (
    <>
    <Head>
      <title>Prank Aadhar</title>
    </Head>
    <Disclaimer/>
    <Aadhar ipAddress={ipAddress}/>
    </>
  )
}
export async function getServerSideProps({ req }) {
  const response = await fetch('https://api.ipify.org?format=json');
  const data = await response.json();
  const ipAddress = data.ip;
  return {
    props: {
      ipAddress
    }
  };
}
