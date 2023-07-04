import React from "react";
import Image from "next/image";
import classesMobile from "./mainCategories.styles.module.css";
import classesDesktop from "./mainCategoriesDesktop.styles.module.css"; 

function MainCategories({ root, clickHander, category, active, typeDevice, hoverHander}: any) {
  const classes = typeDevice === 'mobile' ? classesMobile : classesDesktop

  return (
    <div className={`${classes.mainCategoryWrap} ${active && classes.active}`} onClick={() =>clickHander(category)} 
    onMouseEnter={() => hoverHander(category)} 
    >
      <div className={classes.mainCategory}>
        <Image
          alt={root.name}
          src={root.imgPath}
          width={25}
          height={25}
          style={{ objectFit: "contain", height: "25px"}}
        />
        <p className={`${classes.mainCategoryText} ${active && classes.activeText}`}>{root.name}</p>
        {typeDevice !== 'mobile' && <Image src="/icons/chevron-right.png" alt="arrow-right" width={8} height="12" style={{
          objectFit: "contain",
        }}/>}
      </div>
    </div>
  );
}

export default MainCategories;
