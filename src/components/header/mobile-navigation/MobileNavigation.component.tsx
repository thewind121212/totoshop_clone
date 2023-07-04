
import React from 'react'
import { usePathname } from 'next/navigation'
import NavigationItem from '../navigation-item/NavigationItem.component'

const dummyNavLink = [
    {name: 'New arrivals', link: '/new-arrivals'},
    {name: 'Bộ Sưu tập', link: '/collection'},
    {name: 'SẢN PHẨM', link: '/category'},
    {name: 'feedback', link: '/feedbacker'},
]

function MobileNavigation() {
    const pathname = usePathname()

  return (
    <ul className=' items-center justify-center text-black border border-[#eee] bg-white w-full h-[55px] grow text-xs lg:text-lg  flex md:hidden  '>
        {dummyNavLink.map((link:any) => {
            const active = pathname.includes(link.link) ? true : false
            return (
                 <NavigationItem key={link.name} name={link.name} link={link.link} active={active}/>
            ) 
        })}
    </ul>
  )
}

export default MobileNavigation