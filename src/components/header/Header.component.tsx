"use client";
//library
import { useEffect, useRef } from "react";
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
import MobileCategoryMenu from "../mobile-category-menu/MobileCategoryMenu.component";

//redux
import { useAppDispatch } from "@/app/redux/reduxHook";
import { toogleMobileCategoryMenu } from "../../app/redux/Features/UI/mobileCategoryMenu.slice";
import { toogleDesktopCategoryMenu } from "@/app/redux/Features/UI/desktopCategoryMenu.slice";
import { getYPostion } from "@/app/redux/Features/UI/headerPosition.slice";

function Header() {
  //react core
  const headerRef = useRef<any>(null);

  //useSelector Redux
  const dispatch = useAppDispatch();

  //useEffect
  useEffect(() => {
      dispatch(getYPostion(headerRef.current.offsetHeight))
    if (window.innerWidth < 982) {
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
      if (window.innerWidth < 982) {
        dispatch(toogleDesktopCategoryMenu(false));
        dispatch(getYPostion(headerRef.current.offsetHeight))
      } else {
        dispatch(getYPostion(106))
      }
    }, 0);

    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        dispatch(toogleMobileCategoryMenu(false));
      }
    });
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          dispatch(toogleMobileCategoryMenu(false));
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="fixed w-full top-0 h-auto z-50" ref={headerRef}>
      <AnnouncementBar />
      <MobileCategoryMenu />
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
              onClick={() => dispatch(toogleMobileCategoryMenu(true))}
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
          <DesktopNavigation />
          {/* tool box */}
          <div className="flex justify-center items-center">
            <Search isMobile={false} />
            <Cart />
            <User />
          </div>
        </div>
        <MobileNavigation />
      </div>
    </div>
  );
}

export default Header;
