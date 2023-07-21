"use client";
//library
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
//css
import classes from './header.styles.module.css'

//components
import DesktopNavigation from "./desktop-navigation/DesktopNavigation.component";
import Search from "../UI/search/Search.component";
import Cart from "../UI/cart/Cart.component";
import User from "../UI/user/User.component";
import MobileNavigation from "./mobile-navigation/MobileNavigation.component";
import AnnouncementBar from "../announcement-bar/AnnouncementBar.component";

//redux
import { useAppDispatch } from "@/redux/reduxHook";
import {  toggleCategoryMenu} from "../../redux/Features/UI/categoryMenu.slice";

function Header() {
  //react core
  const [y, setY] = useState<any>('auto');
  const headerRef = useRef<any>(null);

  //useSelector Redux
  const dispatch = useAppDispatch();

  //useEffect
  useEffect(() => {
    if (window.innerWidth < 982) {
      if(headerRef.current.offsetHeight){
        setY(headerRef.current.offsetHeight);
      }
    }

    if (window.innerWidth > 982) {
      setY(106); 
    } 

    const debounce = (fn: any, ms: number) => {
      let timer: any;
      return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(args);
        }, ms);
      };
    };

    const handleResize = debounce(() => {
      if(window.innerWidth < 982) {
        setY(headerRef.current.offsetHeight);
      }else {
        setY(106);
      }
       }, 0);

    const handlerScrollEvent = () => {
      if (window.scrollY > 0) {
        setY(headerRef.current.offsetHeight);
        headerRef.current.style.position = "fixed";
        headerRef.current.style.top = "0";
        headerRef.current.style.width = "100%";
        headerRef.current.style.zIndex = "80";
      } else {
        headerRef.current.style.position = "relative";
        headerRef.current.style
      }
    }

    window.addEventListener("scroll", handlerScrollEvent)

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        dispatch(toggleCategoryMenu(null));
      }
    });


    //this is return to clear useEffect
    return () => {
      window.removeEventListener("scroll", handlerScrollEvent)
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          dispatch(toggleCategoryMenu(null));
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full" style={{height: `  ${y === 'auto' ? 'auto' : y+'px'}  `}}>

    <div className=" w-full top-0 h-auto z-50" ref={headerRef}>
      <AnnouncementBar />
      <div
        className="bg-black md:h-[77px] min-h-[77px]"
        style={{
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <div className="flex items-center max-w-[1440px] justify-between md:justify-normal px-6 md:p-0 w-full h-full ml-auto mr-auto">
          {/* icon mobile */}
          <div className="mobile-icon  w-[150px] visible md:hidden ">
            <Image
              src="/icons/iconMobileMenu.png"
              onClick={() => dispatch(toggleCategoryMenu('mobile'))}
              width={32}
              height={20}
              alt="menu"
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          </div>
          {/* logo */}
          <div className={classes.logo} >
          <Image
            src="/brand/logo/logo.png"
            width={500}
            height={600}
            alt="logo"
            style={{
              objectFit: "contain",
              height: "100%",
            }}
          />
          </div>
          {/* navigation */}
          {window.innerWidth > 982 && <DesktopNavigation/>}
          {/* tool box */}
          <div className="flex justify-center items-center">
            <Search isMobile={false} />
            <Cart />
            <User />
          </div>
        </div>
        {window.innerWidth < 982 && <MobileNavigation/>}
      </div>
    </div>
    </div>
  );
}

export default Header;
