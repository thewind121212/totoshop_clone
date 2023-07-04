"use client";
import { useState } from "react";
import classes from "./mobileCategoryMenu.styles.module.css";
import Search from "../UI/search/Search.component";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHook";
import { toogleMobileCategoryMenu } from "../../app/redux/Features/UI/mobileCategoryMenu.slice";
//component
import MainCategories from "../main-categories/MainCategories.component";
import SubCategories from "../sub-categories/SubCategories.component";

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

function MobileCategoryMenu() {
  //react core
  const [categorySelected, setCategorySelected] = useState<string>("aoKhoac");
  //redux
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.mobileCategoryMenuStatus.isOpen
  );
  //function
  const handleSelectCategory = (category: string) => {
    if (categorySelected === category) return;
    setCategorySelected(category);
  };

  return (
    <div
      className={`${classes.mobileCateogyMenu} ${
        isOpen ? classes.onOpen : classes.onClose
      }`}
    >
      <div className={classes.close}>
        <button
          className={classes.closeButton}
          onClick={() => dispatch(toogleMobileCategoryMenu(false))}
        >
          <svg
            className={classes.closeIcon}
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="CloseIcon"
          >
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
      </div>
      <Search isMobile={true} />
      <div className={classes.categories}>
        <div className={classes.categoriesWrap}>
          <div className={classes.mainCategoriesContent}>
            {Object.keys(dummyCategory).map((category: string) => {
              const root = dummyCategory[category];
              return (
                <MainCategories
                  key={root.name}
                  active={categorySelected === category}
                  category={category}
                  typeDevice="mobile"
                  root={root}
                  clickHander={handleSelectCategory}
                  hoverHander={handleSelectCategory}
                />
              );
            })}
          </div>
          <div className={classes.subCategoriesContent}>
            <SubCategories
              header={dummyCategory[categorySelected].name}
              items={dummyCategory[categorySelected].items}
              typeDevice="mobile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileCategoryMenu;
