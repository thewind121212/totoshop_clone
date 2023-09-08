import React from "react";
import classesMobile from "./subCategories.styles.module.css";
import classesDesktop from "./subCategoriesDesktop.styles.module.css"; 
import Link from "next/link";

function subCategories({ header, items , typeDevice, breadCrumb}: any) {

  const classes = typeDevice === "mobile" ? classesMobile : classesDesktop;


  return (
    <div className={classes.subCategoriesWrap}>
      <div className={classes.subCategoriesHeader}>{header}</div>
      <div className={classes.subCategoriesContent}>
        {
          items.map((item: any) => {
            return (
            <div key={item.name} className={classes.subCategoryWrap} style={{display: !item.active ? 'none' : 'block'}}>
              <Link href={`category/${breadCrumb}/${item.slug}`} className={classes.subCategoryHeader}>{item.name}</Link>
              <div className={classes.subCategoryItems}>
                {item.detailCategoryItems.map((detailItem: any) => {
                    return (
                        <Link href={`category/${breadCrumb}/${item.slug}/${detailItem.slug}`} key={detailItem.categoryDetailId} className={classes.subCategoryItem} style={{display: !item.active ? 'none' : 'block'}}>{detailItem.name}</Link>
                    )
                } )}
              </div>
            </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default subCategories;
