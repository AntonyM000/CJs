import React from 'react'
import Header from '../components/Header'

const Menu = () => {
    const menuitems=[
        {name:'BIG ON BREAKFAST',image:'/Bigonbreakfast.jpg'},
        {name:'GENEROUS BIG MEALS',image:'/Generousbigmeals.jpg'},
        {name:'PERFECTED DRINKS',image:'/Perfecteddrinks.jpg'},
        {name:'DECADENT DESSERTS',image:'/Decadentdrinks.jpg'},
    ]
  return (
    <div>
        <Header/>
        <div className="bg-[url('menubackground.jpg')] bg-cover bg-no-repeat w-full h-full">
            <div className='flex items-center flex-col'>
                <p className="text-2xl my-3 font-semibold">Welcome To CJ's!!</p>
                <p className='text-sm font-normal container '>Welcome to CJ's delicious universe. Everything from our Big on Breakfast, Perfected Drinks, Decadent to your Generous Big Meals Right here at your fingertips. ORDER NOW.</p>
            </div>
            {/* <div className='flex w-full flex-row '> */}
            <div className='flex w-full  flex-wrap justify-center'>
                {menuitems.map((item)=>(
                    
                    <div key={item.name} className='flex items-center   flex-col w-6/12 p-4 '>
                        <img src={item.image} className='w-full rounded-lg' alt={item.name} />
                        <p className='mt-2'>{item.name}</p>
                        </div>
                ))}
                {/* <label htmlFor=""className='flex items-center w-full flex-col'><img src="/Perfecteddrinks.jpg" className='w-5/12 rounded' alt="" />PERFECTED DRINKS</label> */}
                {/* <label htmlFor=""><img src="/Decadentdrinks.jpg" alt="" />DECADENT DESSERTS</label> */}
            </div>
        </div>
    </div>
  )
}

export default Menu