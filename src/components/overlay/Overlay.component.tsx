'use client'
import React from 'react'
import MobileCategoryMenu from '../mobile-category-menu/MobileCategoryMenu.component'
import DesktopCategoryMenu from '../desktop-category-menu/DesktopCategoryMenu.component'
import { useAppSelector } from '@/redux/reduxHook'


function Overlay() {

    const {typeMenu} = useAppSelector(state => state.categoryMenuStatus)


  return (
    <div className=" ">
        <MobileCategoryMenu type={typeMenu}/>
        <DesktopCategoryMenu type={typeMenu}/>
    </div>
  )
}

export default Overlay