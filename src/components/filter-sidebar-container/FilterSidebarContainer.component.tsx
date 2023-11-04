"use client";
import { useState } from "react";
import {
  Form,
  Color,
  Size,
  Price,
  ChevronHorizontal,
} from "../UI/svg/customSVG.component";
import {
  FormFilterContent,
  ColorFilterContent,
  SizeFilterContent,
  PriceFilterContent,
} from "../filter-sidebar-content/FilterContent.component";

import { useAppDispatch } from "@/redux/reduxHook";

const dropDownList = [
  {
    id: 1,
    name: "Kiểu dáng",
    svg: <Form />,
    dropDownContent: "formFilter",
  },
  {
    id: 2,
    name: "Màu sắc",
    svg: <Color />,
    dropDownContent: "colorFilter",
  },
  {
    id: 3,
    name: "Kích thước",
    svg: <Size />,
    dropDownContent: "sizeFilter",
  },
  {
    id: 4,
    name: "Giá",
    svg: <Price />,
    dropDownContent: "priceFilter",
  },
];

const DropDownContainer = ({
  name,
  svg,
  dropDownContent,
  dropDownProps,
}: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({
    subCategoryFilter: [],
    attributeFilter: [],
    priceFilter: [],
  });

  return (
    <div className="w-full h-[auto] border-dashed border-t-[1px] border-[#BDBDBD]">
      <div
        className="flex justify-between h-[24px] my-[12px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="left-item flex">
          {svg}
          <div className="">{name}</div>
        </div>
        <div
          className="right-block w-[24px] h-[24px] flex justify-center items-center"
          style={{
            transition: "all 225ms",
            rotate: isOpen ? "180deg" : "0deg",
          }}
        ></div>
        <ChevronHorizontal />
      </div>
      <div
        className="w-full h-0 overflow-hidden transition-all duration-[225ms] ease-in-out"
        style={{
          height: "auto",
          maxHeight: isOpen ? "700px" : "0px",
          transition: "all 225ms",
        }}
      >
        {dropDownContent === "formFilter" && (
          <FormFilterContent menuCategory={dropDownProps.menuCategory} />
        )}
        {dropDownContent === "sizeFilter" && (
          <SizeFilterContent attributeSize={dropDownProps.attributes} />
        )}
        {dropDownContent === "colorFilter" && (
          <ColorFilterContent
            attributeColor={dropDownProps.attributes["Màu Sắc"]}
          />
        )}
        {dropDownContent === "priceFilter" && <PriceFilterContent />}
      </div>
    </div>
  );
};

function FilterSidebar({
  isFilterSidebarOpen,
  menuCategory,
  attributes,
  filterSubmit,
  filterStatus,
}: {
  isFilterSidebarOpen: boolean;
  menuCategory: any;
  attributes: any;
  filterStatus: boolean;
  filterSubmit: (payload: null | string) => void;
}) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="w-[360px] bg-[#eeeeee] h-[100vh] absolute"
      style={{
        transition: "all 225ms",
        overflowY: "auto",
        transform: isFilterSidebarOpen ? "translateX(0)" : "translateX(100%)",
        boxShadow:
          "0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)",
      }}
    >
      <div className="m-[30px]">
        <div className="w-full h-auto flex justify-between items-center mb-[10px]">
          <h1 className="text-[22px]">LỌC SẢN PHẨM</h1>
          {filterStatus && (
            <div
              className="w-auto h-auto py-[5px] px-[10px] uppercase bg-[#00b156] text-white cursor-pointer"
              onClick={() => filterSubmit("clearFilter")}
            >
              Bỏ lọc
            </div>
          )}
        </div>
        <div className="toolTip w-full h-auto">
          {dropDownList.map((item: any) => (
            <DropDownContainer
              key={item.id}
              name={item.name}
              svg={item.svg}
              dropDownContent={item.dropDownContent}
              dropDownProps={{
                menuCategory: menuCategory,
                attributes: attributes,
              }}
            />
          ))}
          <div
            className="w-full bg-[#00b156] p-[5px] text-white flex justify-center border-1 border-[#00b156] items-center cursor-pointer"
            onClick={() => filterSubmit(null)}
          >
            LỌC
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
