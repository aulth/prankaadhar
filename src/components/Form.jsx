import { MenuItem, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import { Download } from '@mui/icons-material';
const Form = ({ data, setData }) => {
  const handleOnChange = e => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data)
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
  return (
    <>
      <form className="container break-after-page mx-auto p-4 rounded border grid gap-4 grid-cols-1 md:grid-cols-3">
        <TextField variant='standard' onBlur={() => { translate('name') }} color='primary' name='name' onChange={handleOnChange} label="Name" />
        <TextField variant='standard' onBlur={() => { translate('father') }} color='primary' name='father' onChange={handleOnChange} label="Father's Name" />
        <TextField variant='standard' id='hindiFather' defaultValue={data.hindiFather} value={data.hindiFather ? data.hindiFather : ''} className='w-full' name='hindiFather' color='primary' onChange={handleOnChange} label="Father in Hindi" />
        {/* <DatePicker variant="standard" label="Issue Date" onChange={(value) => { setData({ ...data, issueDate: value }) }} /> */}
        <DatePicker variant="standard" label="DOB" onChange={(value) => { handleDOBChange(value.$d) }} />
        <TextField name='gender' onChange={handleOnChange} defaultValue={"Male"} select label="Gender">
          <MenuItem value={"Male"}> Male</MenuItem>
          <MenuItem value={"Female"}> Female</MenuItem>
        </TextField>
        <div className='mt-2'>
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
        <TextField variant='standard' onBlur={() => { translate('address') }} name='address' color='primary' onChange={handleOnChange} label="Address" />
        <TextField variant='standard' id='hindiAddress' defaultValue={data.hindiAddress} value={data.hindiAddress ? data.hindiAddress : ''} className='w-full' name='hindiAddress' color='primary' onChange={handleOnChange} label="Address in Hindi" />
        <label htmlFor="disclaimer">
          <Button variant='contained' href='/disclaimer' className='mt-2 w-full' color='secondary' component="a" >Disclaimer</Button>
        </label>
      </form>
    </>
  )
}

export default Form