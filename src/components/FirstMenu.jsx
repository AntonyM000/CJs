import React from 'react'
import SecondMenu from './SecondMenu'

const FirstMenu = ({menuItems,onMenuClick}) => {
    const handleClick=()=>{
        return <SecondMenu/>
        }
  return (
     <div className="bg-[url('menubackground.jpg')] bg-cover bg-no-repeat w-full h-full">
    <div className='flex items-center flex-col'>
        <p className="text-2xl my-3 font-semibold">Welcome To CJ's!!</p>
        <p className='text-sm font-normal container '>Welcome to CJ's delicious universe. Everything from our Big on Breakfast, Perfected Drinks, Decadent to your Generous Big Meals Right here at your fingertips. ORDER NOW.</p>
    </div>
    {/* <div className='flex w-full flex-row '> */}
    <div className='flex w-full  flex-wrap justify-center'>
        {menuItems.map((item)=>(
            
            <div onClick={onMenuClick} key={item.name} className='flex items-center   flex-col w-6/12 p-4 '>
                <img src={item.image} className='w-full rounded-lg' alt={item.name} />
                <p className='mt-2'>{item.name}</p>
                </div>
        ))}
        
    </div>
</div>
  )
}

export default FirstMenu