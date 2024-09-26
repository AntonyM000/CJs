import React, { useContext, useEffect, useState } from 'react'
import Carousel from '../components/Carousel';
import FullScreenCarousel from '../components/Carousel';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { app } from '../firebase';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';

const Home = () => {
  const { signout, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
//   const db = getFirestore(app);
//   const [userArray, setUserArray] = useState([]);
//   const [userName, setUserName] = useState('');

  

  const handleClick = (name) => {
    if (name === 'LogOut') {
      signout(navigate);
    }
  };
    
    const menuitems =[
        {image:'/menu.png',text:'MENU',to:'/menu'},
        {image:'/locations.png',text:'LOCATIONS'},
        {image:'/blog.png',text:'CAREERS'},
        {image:'/about-us.png',text:'FEEDBACK'},
        {image:'/menu.png',text:'ABOUT US'},

]
        
    
  return (
    <div>
        {/* <div > */}
        <FullScreenCarousel classNam='text-'>
            <button className='rounded fixed bottom-0 right-0 border p-2'onClick={() => handleClick('LogOut')}> Sign out </button>
            <div className="flex sm:flex-row space-x-8 flex-col-reverse">
                <div className="flex sm:my-auto mt-[44%] flex-middle"><button className='bg-red-500 rounded text-4xl mx-auto font-semibold text-white items-center py-1 px-4'>Start Order</button></div>
             <div className=''>
                <img src="/logo-white.png" className='w-[30%] pb-2 ' alt="Cjs logo" />
                {menuitems.map((item,index)=>(
                    <Link to={item.to} key={index} className=' flex  border-t-2 text-white  items-center  border-white'>
                    <img className='w-[15%] px-2 py-4' src={item.image} alt="" />
                    <p className='text-2xl font-semibold '>{item.text}</p>
                    </Link>
                    ))
                }

            </div>
            </div>
        </FullScreenCarousel>

        <div className="images flex flex-wrap py-6 justify-center">
            <div className="bg-[url('/gift-card-home.jpg')] w-6/12  m-2 max-w-lg bg-contain bg-center bg-no-repeat">
            <img src="new-brand-tag.png" className='w-2/12 ml-auto mb-48 max-w-md  ' alt="brand new" />
            </div>
            <div className="bg-[url('/home-page-superfoods.jpg')] w-6/12 m-2 max-w-lg bg-cover bg-center bg-no-repeat">
            <img src="new-brand-tag.png" className='w-2/12 ml-auto mb-48 ' alt="brand new" />
            </div>
        </div>

        <div className="bg-[#c9cfc2] pl-5">
            <div className="text-blue-950 py-2 flex">
            <FaFacebookSquare size={36}/>
            <FaSquareXTwitter size={36}/>
            <FaInstagram size={36}/>
            </div>

            <div className="text-blue-950">
                <p>Join our email list</p>
                <label className='my-2 block  '><input type="text" className='rounded-l font-medium p-2 text-base' placeholder='Email address' /><button className='rounded-r text-white bg-blue-950 font-medium p-2 text-base'>Subscribe</button></label>
                <button className="bg-blue-950 rounded mb-2 text-white font-medium p-2 text-base">Unsubscribe</button>
                <p className="text-blue-950 font-semibold">By clicking "SUBSCRIBE" I agree to receive news, promotions, information, and offers from CJ's.</p>
                <div className="icons flex flex-wrap space-x-2 p-3">
                    <img src="/tripadvisor-logo.png" alt="tripadvisor logo" />
                    <img src="/tripadvisor-2022.png" alt="tripadvisor 2022" className='w-36' />
                </div>
            </div>

        </div>

        {/* <Footer/> */}
            
        {/* </div> */}
    </div>
  )
}

export default Home