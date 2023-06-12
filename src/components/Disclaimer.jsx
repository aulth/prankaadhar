import { Alert, Button } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Disclaimer = () => {
    return (
        <Alert severity='warning' className='flex items-start'>
            This website is for entertainment only. Generated content is fictitious and should not be used officially. Creator is not liable for consequences.
            <Link href='/disclaimer' size='small' className='text-blue-500 ml-2' >/Disclaimer</Link>
        </Alert>
    )
}

export default Disclaimer