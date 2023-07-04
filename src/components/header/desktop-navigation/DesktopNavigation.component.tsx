'use client'
import React from 'react'
import {usePathname} from 'next/navigation'
import NavigationItem from '../navigation-item/NavigationItem.component'


const dummyNavLink = [
    {name: 'New arrivals', link: '/new-arrivals'},
    {name: 'SẢN PHẨM', link: '/category'},
    {name: 'Bộ Sưu tập', link: '/collection'},
    {name: 'feedback', link: '/feedbacker'},
]

function DesktopNavigation() {
    const pathname = usePathname()

  return (
    <ul className=' items-center text-white h-full grow text-[14px] lg:text-[1rem] hidden md:flex  '>
        {dummyNavLink.map((link:any) => {
            const active = pathname.includes(link.link) ? true : false
            return (
                 <NavigationItem key={link.name} name={link.name} link={link.link} active={active}/>
            ) 
        })}
    </ul>
  )
}

export default DesktopNavigation