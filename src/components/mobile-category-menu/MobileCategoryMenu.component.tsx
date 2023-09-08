"use client";
import { useState } from "react";
import classes from "./mobileCategoryMenu.styles.module.css";
import Search from "../UI/search/Search.component";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHook";
import { toggleCategoryMenu } from "../../redux/Features/UI/categoryMenu.slice";
import { useQuery } from "@tanstack/react-query";
//component
import MainCategories from "../main-categories/MainCategories.component";
import SubCategories from "../sub-categories/SubCategories.component";

function MobileCategoryMenu({ type }: any) {
  //react core
  const [categorySelected, setCategorySelected] = useState<number>(1);
  //redux
  const dispatch = useAppDispatch();
  //function
  const handleSelectCategory = (category: number) => {
    if (categorySelected === category) return;
    setCategorySelected(category);
  };

  //use query and function query
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("/api/categories").then(async (res) => {
        const data = await res.json();
        return data.data;
      }),
    refetchOnWindowFocus: false,
  });

  return (
    <div
      className={`${classes.mobileCateogyMenu} ${
        type === "mobile" ? classes.onOpen : classes.onClose
      }`}
    >
      <div className={classes.close}>
        <button
          className={classes.closeButton}
          onClick={() => dispatch(toggleCategoryMenu(null))}
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
            {categoriesQuery.data?.map((category: any) => {
              return (
                <MainCategories
                  key={category.name}
                  active={categorySelected === category.order}
                  category={category}
                  typeDevice="mobile"
                  root={category}
                  hoverHander={handleSelectCategory}
                  clickHander={() => null}
                />
              );
            })}
          </div>
          {categoriesQuery.data
            ?.filter((c: any) => c.order === categorySelected)
            .map((category: any) => {
              return (
                <div
                  className={classes.subCategoriesContent}
                  key={category.slug}
                >
                  <SubCategories
                    header={category.name}
                    items={category.subCategoryItems}
                    breadCrumb={category.slug}
                    typeDevice="mobile" 
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MobileCategoryMenu;
