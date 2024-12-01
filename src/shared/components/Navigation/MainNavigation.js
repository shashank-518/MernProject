import React , {useState} from 'react'
import MainHeader from './MainHeader'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'

import './MainNavigation.css'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElement/BackDrop'

const MainNavigation = () => {

    const [Drawerisopen , isDrawerOpen] = useState(false);

    function clickfun(){
        return isDrawerOpen(true)
    }

    function clickclose(){
        return isDrawerOpen(false)
    }

  return (
    <>

    {
        Drawerisopen && <Backdrop onClick ={clickclose}/>
    }
    <SideDrawer show = {Drawerisopen} onClick = {clickclose} >
        <nav className='main-navigation__drawer-nav' >
        <NavLinks/>
        </nav>
    </SideDrawer>



   <MainHeader>
        <button className='main-navigation__menu-btn ' onClick={clickfun} >
            <span/>
            <span/>
            <span/>
        </button>
        <h1 className='main-navigation__title'>
            <Link> Your Places </Link>
        </h1>
        <nav className='main-navigation__header-nav' >
            <NavLinks/>
        </nav>

   </MainHeader>
    
    </>

  )
}

export default MainNavigation
