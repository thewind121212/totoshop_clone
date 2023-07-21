"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import classes from "./navigationItem.styles.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook";
import {
  toggleCategoryMenu,
  getPositionRender,
} from "@/redux/Features/UI/categoryMenu.slice";

function NavigationItem({ link, name, active}: any) {
  const productRef = useRef<any>(null);
  const activeStyle = active
    ? `${classes.navigationItemActive}`
    : `${classes.navigationItem}`;

  const { typeMenu,positionRender } = useAppSelector((state) => state.categoryMenuStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const resize = () => {
      if(window.innerWidth > 982 ) {
      const dimension = productRef.current?.getBoundingClientRect();
      dispatch(getPositionRender(dimension === undefined ? positionRender : dimension.x));
      }

      if(window.innerWidth > 982 && typeMenu === 'mobile') {
        dispatch(toggleCategoryMenu(null));
      }

      if(window.innerWidth < 982 && typeMenu === 'desktop') {
        dispatch(toggleCategoryMenu(null));
      }

    };
    if (name === "SẢN PHẨM" ) {
      window.addEventListener("resize", resize);
      const dimension = productRef.current?.getBoundingClientRect();
      if (dimension !== undefined) { 
      dispatch(getPositionRender(dimension.x));
      }
    }

    return () => {
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handeToggleDropdown = () => {
    if (window.innerWidth < 982) {
      dispatch(toggleCategoryMenu("mobile"));
    } else {
      dispatch(toggleCategoryMenu("desktop"));
    }
  };

  if (name === "SẢN PHẨM") {
    return (
      <li
        onClick={handeToggleDropdown}
        ref={productRef}
        className={` flex relative w-fit uppercase px-2.5 flex-wrap content-around cursor-pointer  h-full  ${activeStyle} ${
          name === "New arrivals" && classes.hightLight
        } `}
      >
        <div>{name}</div>
      </li>
    );
  }

  return (
    <li
      className={` flex relative w-fit uppercase px-2.5 flex-wrap content-around cursor-pointer  h-full  ${activeStyle} ${
        name === "New arrivals" && classes.hightLight
      } `}
    >
      <Link href={link}>{name}</Link>
    </li>
  );
}

export default NavigationItem;
