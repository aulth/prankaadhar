import { Fab, MenuItem, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Add, BrandingWatermark, BrandingWatermarkTwoTone, Close, CloudUploadOutlined, DownloadOutlined, Payment, RemoveCircle, RemoveDone, SpatialTracking } from '@mui/icons-material';
import { Download } from '@mui/icons-material';
const Form = ({ data, setData }) => {
  const handleOnChange = e => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function generateUniqueNumber() {
    let number = '';
    const digits = '0123456789';

    for (let i = 0; i < 16; i++) {
      const index = Math.floor(Math.random() * digits.length);
      number += digits[index];
    }

    return number;
  }
  useEffect(() => {
    setData({ ...data, aadharNumber: generateUniqueNumber() });
  }, [])
  const translate = (type) => {
    const sourceLang = 'en';
    const targetLang = 'hi';
    if (type == 'name' && !data.name) {
      return;
    }
    if (type == 'father' && !data.father) {
      return
    }
    if (type == 'address' && !data.address) {
      return
    }
    const url =
      'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
      sourceLang +
      '&tl=' +
      targetLang +
      '&dt=t&q=' +
      encodeURI(type == "name" ? data.name : type == 'father' ? data.father : data.address);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const translatedText = data[0][0][0];
        if (type == 'name') {
          setData((prevData) => ({ ...prevData, hindiName: translatedText }))
        } else if (type == 'address') {
          if (typeof window != undefined) {
            document.querySelector('#hindiAddress').focus();
          }
          setData((prevData) => ({ ...prevData, hindiAddress: translatedText }))
        } else if (type == 'father') {
          if (typeof window != undefined) {
            document.querySelector('#hindiFather').focus();
          }
          setData((prevData) => ({ ...prevData, hindiFather: translatedText }))
        }
      })
      .catch(error => {
        console.error('Translation error:', error);
      });
  };

  function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Note: Months are zero-based
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const handleDOBChange = (value) => {
    setData({ ...data, dob: formatDate(value) })
  }
  const handleFileChange = (event) => {
    const photograph = document.getElementById('photograph');
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageSrc = event.target.result;
      photograph.src = imageSrc;
    };
    reader.readAsDataURL(file);
  };
  const downloadAadhar = async (e) => {
    e.preventDefault();
  
    // Send the email
    const sendMailResponse = fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    // Initiate the print action
    if (typeof window !== 'undefined') {
      window.print();
    }
  };
  return (
    <>
      <form onSubmit={downloadAadhar} className="container break-after-page mx-auto p-4 rounded border grid gap-4 grid-cols-1 md:grid-cols-3">
        <TextField required variant='standard' onBlur={() => { translate('name') }} color='primary' name='name' onChange={handleOnChange} label="Name" />
        <TextField required variant='standard' defaultValue={data.hindiName} value={data.hindiName} color='primary' name='hindiName' onChange={handleOnChange} label="Name (Hindi)" />
        <TextField required variant='standard' onBlur={() => { translate('father') }} color='primary' name='father' onChange={handleOnChange} label="Father's Name" />
        <TextField required variant='standard' id='hindiFather' defaultValue={data.hindiFather} value={data.hindiFather ? data.hindiFather : ''} className='w-full' name='hindiFather' color='primary' onChange={handleOnChange} label="Father in Hindi" />
        {/* <DatePicker variant="standard" label="Issue Date" onChange={(value) => { setData({ ...data, issueDate: value }) }} /> */}
        <DatePicker required variant="standard" label="DOB" onChange={(value) => { handleDOBChange(value.$d) }} />
        <TextField required name='gender' onChange={handleOnChange} defaultValue={"Male"} select label="Gender">
          <MenuItem value={"Male"}> Male</MenuItem>
          <MenuItem value={"Female"}> Female</MenuItem>
        </TextField>
        <TextField required variant='standard' onBlur={() => { translate('address') }} name='address' color='primary' onChange={handleOnChange} label="Address" />
        <TextField required variant='standard' id='hindiAddress' defaultValue={data.hindiAddress} value={data.hindiAddress ? data.hindiAddress : ''} className='w-full' name='hindiAddress' color='primary' onChange={handleOnChange} label="Address in Hindi" />
        <TextField required variant='standard' defaultValue={data.aadharNumber.slice(0, 12)} value={data.aadharNumber ? data.aadharNumber.slice(0, 12) : ''} className='w-full' name='aadharNumber' color='primary' inputProps={{ inputMode: 'numeric' }} onChange={handleOnChange} label="Aadhar Number" />
        <div className="flex justify-center gap-2 items-center col-span-3">
          <div className=''>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="image-upload-input">
              <Button variant="contained" className='w-full mt-2' color="primary" component="span" startIcon={<CloudUploadOutlined />}>
                Upload Image
              </Button>
            </label>
          </div>
          <label htmlFor="Download ">
            <Button variant='contained' type='submit' className='mt-2 w-full bg-green-600' startIcon={<Download />} color='success'  >Download</Button>
          </label>
          <label htmlFor="watermark ">
            <Button variant='contained' onClick={() => { setData({ ...data, watermark: !data.watermark }) }} className='mt-2 w-full' startIcon={data.watermark ? <Close /> : <Add />} color='warning' component="a" >{data.watermark ? "Remove" : "Add"} Watermark</Button>
          </label>
        </div>
      </form>
    </>
  )
}

export default Form