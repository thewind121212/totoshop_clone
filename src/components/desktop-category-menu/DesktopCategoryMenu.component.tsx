"use client";

import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/reduxHook";
import { toogleDesktopCategoryMenu } from "@/app/redux/Features/UI/desktopCategoryMenu.slice";
import classes from "./desktopCategoryMenu.styles.module.css";
//component
import MainCategories from "../main-categories/MainCategories.component";
import SubCategories from "../sub-categories/SubCategories.component";

//dummy data
const dummyCategory: any = {
  aoKhoac: {
    imgPath: "/icons/aoKhoac.png",
    name: "Áo Khoác",
    items: {
      "áo khoác nam": ["Áo Khoác Thun", "Aó Khoác Dù"],
      "áo khoác nữ": ["Áo Hoodie"],
      "áo khoác Unisex": ["Áo Khoác Bomber", "Áo Khoác Jeans"],
    },
  },
  doNam: {
    imgPath: "/icons/doNam.png",
    name: "Đồ Nam",
    items: {
      "áo thun": [
        "Áo Khoác Tay Ngắn",
        "Aó Thun Tay Dài",
        "Áo Thun Polo",
        "Áo Thun Ba Lỗ",
      ],
      "áo Sơ mi nam": ["Áo Sơ mi tay ngắn", "Áo Sơ mi tay dài"],
      "quần Short": [
        "Quần Short Kaki",
        "Quần Short Jean",
        "Quần Short Thun",
        "Quần Short Tây",
      ],
      "quần dài": [
        "Quần Kaki",
        "Quần Jean",
        "Quần Thun",
        "Quần Tây",
        "Quần Jogger",
      ],
    },
  },
  doNu: {
    imgPath: "/icons/doNu.png",
    name: "Đồ Nữ",
    items: {
      "Áo Kiểu": [],
      "Áo Thun": ["Áo Thun tay ngắn", "Áo Thun tay dài"],
      "Áo Sơ mi nữ": ["Áo Sơ mi Tay Ngắn", "Áo Sơ mi Tay Dài"],
      "Đầm nữ": [],
      "Chân Váy": [],
      "Quần Short": ["Quần Short Kaki", "Quần Short Jean"],
      Yếm: [],
      "Quần Dài": [
        "Quần Kaki",
        "Quần Jean",
        "Quần Thun",
        "Quần Tây",
        "Quần Jogger",
      ],
    },
  },
  doUnisex: {
    imgPath: "/icons/Unisex.png",
    name: "Đồ Unisex",
    items: {
      "áo thun unisex": [
        "Áo Khoác Thun UNISEX tay dài",
        "Áo Khoác Thun UNISEX tay ngắn",
        "Áo Thun UNISEX tay dài",
        "Áo Thun UNISEX Polo",
        "Áo Thun UNISEX Ba Lỗ",
      ],
      "áo sơ mi unisex": [
        "Áo Sơ mi UNISEX tay ngắn",
        "Áo Sơ mi UNISEX tay dài",
      ],
    },
  },
  phuKien: {
    imgPath: "/icons/phuKien.png",
    name: "Phụ Kiện",
    items: {
      Nón: ["Nón Snapback", "Nón Lưỡi Trai", "Nón Bucket", "Nón Phớt"],
      "Thắt Lưng": [],
      Balo: [],
      "Túi Sách": [],
    },
  },
};

function DesktopCategoryMenu() {
  const locationRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  //redux
  const { isOpen } = useAppSelector((state) => state.desktopCategoryMenuStatus);
  let { y } = useAppSelector((state) => state.headerPositionStatus);
  const [categorySelected, setCategorySelected] = useState<string>("aoKhoac");

  useEffect(() => {
    const pos = locationRef.current.getBoundingClientRect();
    if (pos.x + pos.width !== 0) {
      const full = pos.x + pos.width;
      const windowWidth = window.innerWidth;
      const chenh = windowWidth - full;
      if (chenh < 0) {
        locationRef.current.style.left = `${chenh}px`;
      }
      if (chenh > 0) {
        locationRef.current.style.left = `0px`;
      }
    }
  });


  //function
  const handleSelectCategory = (category: string) => {
    if (categorySelected === category) return;
    setCategorySelected(category);
  };

  return (
    <div
      ref={locationRef}
      onMouseLeave={() => dispatch(toogleDesktopCategoryMenu(false))}
      className={` ${classes.desktopCategoryMenu} ${isOpen && classes.isOpen}`}
    >
        <div className={classes.desktopCategoryMenuMain}>
             {Object.keys(dummyCategory).map((category: string) => {
              const root = dummyCategory[category];
              return (
                <MainCategories
                  key={root.name}
                  active={categorySelected === category}
                  category={category}
                  typeDevice="desktop"
                  root={root}
                  hoverHander={handleSelectCategory}
                  clickHander={() => null}
                />
              );
            })}   
        </div>
        <div className={classes.desktopCategoryMenuSub}>
            <SubCategories
              header={dummyCategory[categorySelected].name}
              items={dummyCategory[categorySelected].items}
              typeDevice="Desktop"
            />
        </div>
    </div>
  );
}

export default DesktopCategoryMenu;
