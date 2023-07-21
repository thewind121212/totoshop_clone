"use client";

import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHook";
import { toggleCategoryMenu } from "@/redux/Features/UI/categoryMenu.slice";
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

function DesktopCategoryMenu({type} : any) {
  const locationRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const [categorySelected, setCategorySelected] = useState<string>("aoKhoac");
  //redux
  const dispatch = useAppDispatch();
  const {positionRender } = useAppSelector((state) => state.categoryMenuStatus);


  useEffect(() => {
    const left = positionRender === null ? 0 : positionRender 
    locationRef.current.style.top = `${106}px`;
        locationRef.current.style.left = `${left}px`;
  },[positionRender]);


  //function
  const handleSelectCategory = (category: string) => {
    if (categorySelected === category) return;
    setCategorySelected(category);
  };


  const handlerMouseLeave = () : any => {
    timeoutRef.current = setTimeout(() => {
    dispatch(toggleCategoryMenu(null));
    },600)
  }

  // console.log(type)
  return (
    <div
      ref={locationRef}
      onMouseLeave={() => handlerMouseLeave()}
      onMouseOver={() => clearTimeout(timeoutRef.current)}
      className={` ${classes.desktopCategoryMenu} ${type === 'desktop' && classes.isOpen}`}
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
