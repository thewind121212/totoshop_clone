import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { XCircleIcon } from "../UI/svg/customSVG.component";

function CategoryController({
  breadCrum,
  subCategories,
  page,
  totalProducts,
  paramsObject,
  openFilterSideBar,
  filterSearchParam,
  patchName,
  setLoading,
  orderBy,
  filterActive,
  clearFilter
}: {
  breadCrum: any;
  subCategories: any;
  page: number;
  totalProducts: number;
  paramsObject: any;
  filterSearchParam: string;
  patchName: string;
  orderBy: string;
  clearFilter: () => void,
  filterActive: boolean;
  setLoading: (payload: boolean) => void;
  openFilterSideBar: () => void;
}) {
  const orderMenuRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderByStatus, setOrderByStatus] = useState<string>("SẮP XẾP THEO");
  const router = useRouter();

  useEffect(() => {
    switch (orderBy) {
      case "default": 
        return setOrderByStatus("SẮP XẾP THEO");
      case "orderByLike":
        return setOrderByStatus("Bán chạy nhất");
      case "orderByNewest":
        return setOrderByStatus("Mới nhất");
      case "orderByPriceASC":
        return setOrderByStatus("Giá: Thấp - Cao");
      case "orderByPriceDES":
        return setOrderByStatus("Giá: Cao - Thấp");
    }
  }, [orderBy]);

  const onOrderHandler = (payload: string) => {
    if (orderBy === payload) return;
    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      router.push(`${patchName}?order=${payload}${filterSearchParam}`);
    }, 200);
  };

  const toggleOrderMenu = (payload: string) => {
    if (payload === "mouseReEnter") {
      clearTimeout(orderMenuRef.current);
    }
    if (payload === "mouseLeave") {
      orderMenuRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 400);
    }
  };

  return (
    <div className="py-6 px-[14px] h-auto max-w-[1200px] m-auto">
      <div className="w-full h-full flex ">
        <div className="w-auto h-auto basis-8/12 ">
          <div className="w-full">
            <div className="m-2 w-[100%] flex">
              {breadCrum.map((item: any, index: number) => {
                return (
                  <div key={item.link} className="flex">
                    <Link
                      className="hover:text-[#00b156] duration-100"
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                    <div className="mx-2">
                      {breadCrum.length - 1 == index ? "" : "/"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-start gap-[5px] flex-wrap">
            {subCategories.map((item: any, index: number) => {
              return (
                <Link
                  key={index + item.link}
                  href={item.link}
                  className="py-[16px] px-[25px] w-[auto] h-[auto] flex items-center justify-center bg-slate-100"
                  style={{
                    boxShadow: "    box-shadow: 0 4px 4px rgba(99,109,126,.08)",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-auto  basis-4/12">
          <div className="w-full h-1/2 flex justify-end items-center">
            <div className="m-2">
              {breadCrum.length > 0 ? breadCrum[breadCrum.length - 1].name : ""}
            </div>
            <div className="">/</div>
            <div className="m-2 ">{`Trang ${page} - ${totalProducts} sản phẩm`}</div>
          </div>
          <div className="w-full h-1/2 flex items-center justify-end gap-[15px]">
            {filterActive && 
            <div className="uppercase flex justify-center items-center gap-[5px] border-[1.5px] rounded-[4px] border-[#00b156] px-[8px]"
              onClick={clearFilter}
            >
              <div className="flex justify-center items-center text-[#00b156] whitespace-nowrap">
                Bỏ lọc
              </div>
              <div className="w-auto h-full flex justify-center items-center">
                <XCircleIcon />
              </div>
            </div>
            }
            <div className="m-2 w-[30%] flex justify-center items-center">
              <div className="text-[#00b156] flex whitespace-nowrap relative cursor-pointer">
                <div
                  className="uppercase flex justify-center items-center gap-[3px]"
                  onMouseEnter={() => setIsOpen(!isOpen)}
                  style={
                    orderBy !== "default"
                      ? {
                          border: "1.5px solid #00b156",
                          padding: "0px 4px",
                          borderRadius: "4px",
                        }
                      : {}
                  }
                >
                  {orderByStatus}
                  <span className="w-[19px] h-[19px] inline-block">
                    {orderBy !== "default" ? (
                      <svg
                        onClick={() => onOrderHandler("default")}
                        className="h-[21px] w-[21px] cursor-pointer text-[#00b156]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => setIsOpen(!isOpen)}
                        aria-hidden="true"
                        className="w-[19px] h-[19px]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div
                  className="w-auto h-0 absolute z-10 bg-[#ffffff] top-[30px] duration-200 overflow-hidden left-[0px]"
                  onMouseLeave={() => toggleOrderMenu("mouseLeave")}
                  onMouseEnter={() => toggleOrderMenu("mouseReEnter")}
                  style={{
                    boxShadow: "2px 2px 11px hsla(0,3%,7%,.1)",
                    borderRadius: "6px",
                    height: isOpen ? "192px" : "0px",
                  }}
                >
                  <ul className="w-auto h-auto  text-[#000000] flex flex-col z-10 gap-[16px] m-[24px] cursor-pointer rounded-md">
                    <li
                      className="hover:text-[#00b156] duration-200"
                      onClick={() => onOrderHandler("orderByLike")}
                    >
                      Bán chạy nhất
                    </li>
                    <li
                      className="hover:text-[#00b156] duration-200"
                      onClick={() => onOrderHandler("orderByNewest")}
                    >
                      Mới nhất
                    </li>
                    <li
                      className="hover:text-[#00b156] duration-200"
                      onClick={() => onOrderHandler("orderByPriceASC")}
                    >
                      Giá: Thấp - Cao
                    </li>
                    <li
                      className="hover:text-[#00b156] duration-200"
                      onClick={() => onOrderHandler("orderByPriceDES")}
                    >
                      Giá: Cao - Thấp
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={openFilterSideBar}
              style={{
                visibility: paramsObject.sub !== "none" ? "hidden" : "visible",
              }}
            >
              <svg
                className="h-[20px] w-[20px] mr-[4px] text-[#00b156]"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-[#00b156] whitespace-nowrap">LỌC SẢN PHẨM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryController;
