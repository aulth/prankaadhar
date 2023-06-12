import React, { useState, useEffect } from 'react'
import QRCode from 'qrcode.react';
import Form from './Form';
import Watermark from './Watermark';
const Aadhar = ({ipAddress}) => {
    const [data, setData] = useState({ name: '', watermark: true, aadharNumber: '', ipAddress:ipAddress, address: '', hindiName: '', gender: 'Male' })
    const text = `Name
${data.name}
Address
${data.address}
Hindi Address
${data.hindiAddress}
Aadhar Number
${data.aadharNumber}
Hindi Name
${data.hindiName}
Gender
${data.gender}
Father
${data.father}
`;
    return (
        <>
            <Form data={data} setData={setData} />
            <div id='aadharCard' className="container relative flex md:flex-row flex-col justify-center mx-auto gap-2 p-4">
                <div className="border relative p-2 h-[250px] w-[450px]">
                    {data.watermark &&
                        <Watermark text={'https://prankaadhar.vercel.app'} />
                    }
                    <div className="grid grid-cols-5">
                        <div>
                            <img src="/image/satyamevjayate.png" className='w-[25px] mx-auto ml-8' alt="" />
                        </div>
                        <div className="col-span-3">
                            <img src="/image/front.png" className='w-[260px] -mt-1 mx-auto' alt="" />
                        </div>
                    </div>
                    <div className="flex mt-3">
                        <div className='w-[90px] shrink-0 ml-2'>
                            <img className='border border-gray-400 aspect-[2/2] shrink-0' id='photograph' src="https://thumbs.dreamstime.com/b/%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D1%8C-man-shirt-tie-businessman-avatar-male-face-icon-vector-illustration-202643262.jpg" alt="" />
                        </div>
                        <div className="w-full pl-2  text-[0.8rem]">
                            <p className="font-semibold">{data.hindiName && data.hindiName}</p>
                            <p className="font-semibold ">{data.name}</p>
                            <p className="font-semibold ">DOB: {data.dob && data.dob}</p>
                            <p className="font-semibold ">Gender: {data.gender && data.gender}</p>
                        </div>
                        <div className='w-[80px] h-[80px] shrink-0  mt-4 bg-red-300 mr-2 relative'>
                            <div className='absolute bottom-0 '>
                                <QRCode value={text} size={80} />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-2 w-full left-0">
                        <div className="mx-auto border-b-2 border-red-500 pb-1">
                            <p className="text-xl text-center font-semibold">
                                {data.aadharNumber && data.aadharNumber.slice(0, 4) + " " + data.aadharNumber.slice(4, 8) + " " + data.aadharNumber.slice(8, 12)}
                            </p>
                        </div>
                        <div className="mx-auto py-1">
                            <p className="text-center font-semibold">
                                <span className="text-red-500">आधार - </span>
                                <span className="text-black">आम आदमी का अधिकार</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="border p-2 relative h-[250px] w-[450px]">
                    {data.watermark &&
                        <Watermark text={'https://prankaadhar.vercel.app'} />
                    }
                    <div className="grid grid-cols-5">
                        <div>
                            <img src="/image/satyamevjayate.png" className='w-[25px] mx-auto ml-8' alt="" />
                        </div>
                        <div className="col-span-3">
                            <img src="/image/back.png" className='w-[260px] -mt-0.5 mx-auto' alt="" />
                        </div>
                        <div>
                            <img src="https://uidai.gov.in/images/logo/aadhaar_english_logo.svg" className='w-[50px] mx-auto' alt="" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 mt-3 gap-4 mb-6">
                        <div>
                            <p className="font-semibold text-center">पता:</p>
                            <p className="text-left text-sm leading-tight font-[500]">
                                {data.gender && data.gender == "Male" ? 'S/o ' : 'D/o '}{data.hindiFather}  {data.hindiAddress && data.hindiAddress}
                            </p>
                        </div>
                        <div>
                            <p className="font-semibold text-center">Address:</p>
                            <p className="text-left text-sm leading-tight font-[400]">{data.gender && data.gender == "Male" ? 'S/o ' : 'D/o '}{data.father} {data.address && data.address}</p>
                        </div>
                    </div>
                    <div className="absolute bottom-2 w-full left-0">
                        <div className="mx-auto border-b-2 border-red-500 pb-1">
                            <p className="text-xl text-center font-semibold">
                                {data.aadharNumber && data.aadharNumber.slice(0, 4) + " " + data.aadharNumber.slice(4, 8) + " " + data.aadharNumber.slice(8, 12)}
                            </p>
                        </div>
                        <div className="mx-auto py-1 ">
                            <p className="text-center font-semibold">
                                <span className="text-red-500">आधार - </span>
                                <span className="text-black">आम आदमी का अधिकार</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Aadhar