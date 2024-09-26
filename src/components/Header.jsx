import React from 'react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { TfiShoppingCart } from 'react-icons/tfi'
import { NavLink } from 'react-router-dom'

const Header = () => {
    const items=[
        {name:'HOME',to:'/'},
        {name:'MENU',to:'/menu'},
        {name:'FEATURED PRODUCTS'},
        {name:'DEALS'}


    ]
  return (
    <header className='flex bg-white border-b-2  shadow-xl items-center text-[#a8b49e] '>
        <div className='w-5/12'>
        <img src="/logo-beige.png" className='w-3/12 py-2 pl-[10%]' alt="" />
        </div>
        <div className='w-7/12 flex text-lg font-medium justify-around'>
        {items.map((item)=>(
            <NavLink to={item.to} key={item.name}>{item.name}</NavLink>
            ))}
        <TfiShoppingCart />
        <IoPersonCircleOutline />
        </div>
    </header>
  )
}

export default Header
