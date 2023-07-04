import React from "react";
import classesMobile from "./subCategories.styles.module.css";
import classesDesktop from "./subCategoriesDesktop.styles.module.css"; 

function subCategories({ header, items , typeDevice}: any) {

  const classes = typeDevice === "mobile" ? classesMobile : classesDesktop;

  return (
    <div className={classes.subCategoriesWrap}>
      <div className={classes.subCategoriesHeader}>{header}</div>
      <div className={classes.subCategoriesContent}>
        {Object.keys(items).map((item: string) => {
          return (
            <div key={item} className={classes.subCategoryWrap}>
              <div className={classes.subCategoryHeader}>{item}</div>
              <div className={classes.subCategoryItems}>
                {items[item].map((subItem: string) => {
                    return (
                        <div key={subItem} className={classes.subCategoryItem}>{subItem}</div>
                    )
                } )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default subCategories;
