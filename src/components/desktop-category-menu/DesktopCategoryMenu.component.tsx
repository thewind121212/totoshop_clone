"use client";
import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHook";
import { toggleCategoryMenu } from "@/redux/Features/UI/categoryMenu.slice";
import classes from "./desktopCategoryMenu.styles.module.css";
import { useQuery } from "@tanstack/react-query";
//component
import MainCategories from "../main-categories/MainCategories.component";
import SubCategories from "../sub-categories/SubCategories.component";


function DesktopCategoryMenu({ type }: any) {
  const locationRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const [categorySelected, setCategorySelected] = useState<number>(1);

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

  //redux
  const dispatch = useAppDispatch();
  const { positionRender } = useAppSelector(
    (state) => state.categoryMenuStatus
  );

  useEffect(() => {
    const left = positionRender === null ? 0 : positionRender;
    locationRef.current.style.top = `${106}px`;
    locationRef.current.style.left = `${left}px`;
  }, [positionRender]);

  //function
  const handleSelectCategory = (category: number) => {
    if (categorySelected === category) return;
    setCategorySelected(category);
  };

  const handlerMouseLeave = (): any => {
    timeoutRef.current = setTimeout(() => {
      dispatch(toggleCategoryMenu(null));
    }, 600);
  };

  return (
    <div
      ref={locationRef}
      onMouseLeave={() => handlerMouseLeave()}
      onMouseOver={() => clearTimeout(timeoutRef.current)}
      className={` ${classes.desktopCategoryMenu} ${
        type === "desktop" && classes.isOpen
      }`}
    >
      <div className={classes.desktopCategoryMenuMain}>
        {categoriesQuery.data?.map((category: any) => {
          return (
            <MainCategories
              key={category.name}
              active={categorySelected === category.order}
              category={category}
              typeDevice="desktop"
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
              <div className={classes.desktopCategoryMenuSub} key={category.slug}>
                <SubCategories
                  header={category.name}
                  breadCrumb={category.slug}
                  items={category.subCategoryItems}
                  typeDevice="Desktop"
                />
              </div>
            );
          })}
    </div>
  );
}

export default DesktopCategoryMenu;
