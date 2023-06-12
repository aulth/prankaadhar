import Aadhar from '@/components/Aadhar'
import Disclaimer from '@/components/Disclaimer'
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Form from '@/components/Form'
import { Alert, TextField } from '@mui/material'
export default function Home() {
  return (
    <>
    <Disclaimer/>
    <Aadhar/>
    </>
  )
}
