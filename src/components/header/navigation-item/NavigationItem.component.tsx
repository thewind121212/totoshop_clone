"use client";
import React from "react";
import Link from "next/link";
import classes from "./navigationItem.styles.module.css";
import DesktopCategoryMenu from "../../desktop-category-menu/DesktopCategoryMenu.component";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHook";
import { toogleDesktopCategoryMenu } from "@/app/redux/Features/UI/desktopCategoryMenu.slice";
import { toogleMobileCategoryMenu } from "@/app/redux/Features/UI/mobileCategoryMenu.slice";

function NavigationItem({ link, name, active }: any) {
  const activeStyle = active
    ? `${classes.navigationItemActive}`
    : `${classes.navigationItem}`;

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.desktopCategoryMenuStatus);

  const handeToggleDropdown = () => {
    if (!isOpen) {
      if (window.innerWidth < 982) {
        dispatch(toogleMobileCategoryMenu(true));
      } else {
        dispatch(toogleDesktopCategoryMenu(!isOpen));
      }
    }
  };

  if (name === "SẢN PHẨM") {
    return (
      <li
        onClick={handeToggleDropdown}
        className={` flex relative w-fit uppercase px-2.5 flex-wrap content-around cursor-pointer  h-full  ${activeStyle} ${
          name === "New arrivals" && classes.hightLight
        } `}
      >
        <div>{name}</div>
        <DesktopCategoryMenu />
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
