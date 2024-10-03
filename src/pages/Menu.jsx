import React, { useState } from 'react'
import Header from '../components/Header'
import FirstMenu from '../components/FirstMenu'
import SecondMenu from '../components/SecondMenu'

const Menu = () => {
  const [showSecondMenu, setShowSecondMenu] = useState(false); 

    const menuItems=[
        {name:'BIG ON BREAKFAST',image:'/Bigonbreakfast.jpg',onclick:'',array:'BIG ON BREAKFAST'},
        {name:'GENEROUS BIG MEALS',image:'/Generousbigmeals.jpg'},
        {name:'PERFECTED DRINKS',image:'/Perfecteddrinks.jpg'},
        {name:'DECADENT DESSERTS',image:'/Decadentdrinks.jpg'},
    ]
    const handleShowSecondMenu = () => {
      setShowSecondMenu(true); 
  };
  return (
    <div>
        <Header/>
        {!showSecondMenu ? (
       <FirstMenu menuItems={menuItems} onMenuClick={handleShowSecondMenu}/>
      ):(
        <SecondMenu/>
      )
      }
    </div>
  )
}

export default Menu