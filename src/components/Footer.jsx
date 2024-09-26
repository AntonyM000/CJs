import React from 'react'
import { FaRegCopyright } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentDate= new Date();
  return (
    <div className='bg-[#a8b49e] pl-2 text-blue-900 text-lg'>
        <p className='font-bold text-base py-12'>CONTACT US - 0800 720 003</p>
        
        <div className='flex text-base font-medium  flex-col'>
            <p className='font-bold py-4'>LOCATIONS</p>
            <Link>Kilimani</Link>
            <Link>Koinange Street</Link>
            <Link>Village Market</Link>
            <Link>The Waterfront Mall, Karen</Link>
            <Link>The Imaara Mall</Link>
        </div>
        
        <div className='flex text-base font-medium flex-col'>
            <p className='font-bold py-4'>OUR MENU</p>
            <Link>BREAKFAST</Link>
            <Link>DRINKS</Link>
            <Link>MAINS</Link>
            <Link>DESSERTS</Link
        ></div>

        <p className='py-3 text-base font-medium'>We're commited to great food, great coffee, great service, an experience that will make your time with us fabulous. All visuals are serving suggestions only.<br/>
        Prices are quoted in Kenyan Shillings and inclusive of VAT.</p>

        <Link className='text-base p-2  font-medium '>Privacy Policy           |</Link>
        <Link className='text-base p-2 font-medium'>Terms of Use           |</Link>
        <Link className='text-base p-2 font-medium'>Contact Us           |</Link>
        <Link className='text-base p-2 font-medium' >Feedback           |</Link>

        <div className='flex items-center'><FaRegCopyright /><p>{new Date().getFullYear()} CJ's. All Rights Reserved</p></div>
    </div>
  )
}

export default Footer