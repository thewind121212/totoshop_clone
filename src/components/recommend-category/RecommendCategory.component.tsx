import React from "react";
import Image from "next/image";
import classes from "./recommmendCateogy.styles.module.css";

const recommmendCateogyContent = [
  {
    id: 1,
    header: "ÁO KHOÁC",
    content: "Áo khoác thời trang Nam/Nữ",
    icon: "/icons-category/1.png",
  },
  {
    id: 2,
    header: "ĐỒ NAM",
    content: "Áo thun, sơ mi, quần dài, sort...",
    icon: "/icons-category/2.png",
  },
  {
    id: 3,
    header: "ĐỒ NỮ",
    content: "Áo quần, chân váy, đầm, yếm...",
    icon: "/icons-category/3.png",
  },
  {
    id: 4,
    header: "ĐỒ UNISEX",
    content: "Áo thun, sơ mi, áo khoác UNISEX",
    icon: "/icons-category/4.png",
  },
  {
    id: 5,
    header: "PHỤ KIỆN",
    content: "Balo, túi xách, nón, thắt lưng, ví...",
    icon: "/icons-category/5.png",
  },
  {
    id: 6,
    header: "#TOTODAY",
    content: "Sản phẩm được TOTODAY đề xuất",
    icon: "/icons-category/6.png",
  },
];

function RecommendCategory() {
  return (
    <div className={classes.recommmendCategoryRoot}>
      <div className={classes.recommmendCategoryWrap}>
        {recommmendCateogyContent.map((item) => {
          return (
            <div className={classes.rCategoryItem} key={item.id}>
              <div className={classes.rCategoryItemWrap}>
                <div className={classes.rCategoryItemImage}>
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={45}
                    height={45}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className={classes.rCategoryItemHead}>{item.header}</div>
                <div className={classes.rCategoryItemSub}>
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecommendCategory;
