import React from "react";
import { ChevronLeft, ChevronRight } from "../UI/svg/customSVG.component";

function PageNavigate({
  page,
  changePageHandler,
  pagination,
  totalPage,
}: {
  page: number;
  changePageHandler: (type: string, item: any) => void;
  pagination: any;
  totalPage: number;
}) {
  return (
    <div className="w-full h-[120px] flex justify-center items-center">
      <div className="w-auto h-auto flex justify-center items-center">
        <div
          className="w-[20px] h-[32px] flex justify-center items-center text-[#00b156] cursor-pointer"
          style={{ opacity: page === 1 ? "0.5" : "1" }}
          onClick={() => changePageHandler("prev", null)}
        >
          <ChevronLeft />
        </div>
        {pagination.map((item: any, index: any) => {
          return (
            <div
              key={index}
              className="w-[32px] h-[32px] text-[14px] flex justify-center items-center text-[#616161] cursor-pointer"
              onClick={() => changePageHandler("changePage", item)}
              style={{
                backgroundColor: item == page ? "#00b156" : "",
                color: item == page ? "#fff" : "",
              }}
            >
              {item}
            </div>
          );
        })}
        <div
          className="w-[20px] h-[32px] flex justify-center items-center text-[#00b156] cursor-pointer"
          style={{ opacity: page === totalPage ? "0.5" : "1" }}
          onClick={() => changePageHandler("next", null)}
        >
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default PageNavigate;
