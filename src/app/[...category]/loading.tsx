import React from "react";
import {
  ProductControlerLoading,
  CardLoading,
} from "@/components/UI/skeleton/Skeleton.UI";

export const ProductsLoading = () => {
  return (
    <div className="w-full max-w-[1200px] h-[90vh] mx-auto ">
      {/* category interact loading */}
      <div className="py-6 px-[14px] h-[131px] ">
        <ProductControlerLoading />
      </div>
      {/* category display loadin*/}
      <div className="px-[14px] w-full h-auto grid grid-cols-4 gap-[14px]">
        {Array.from({ length: 16 }, (_: any, index: any) => {
          return <CardLoading key={index} />;
        })}
      </div>
    </div>
  );
};

const Loading = (props: any) => {
  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto aspect-[1440/321] border-2 rounded-md mx-auto mb-6 ">
        <div className=" w-full flex skeleton bg-slate-400 flex-row items-center h-full justify-center space-x-5"></div>
      </div>
    </div>
  );
};

export default Loading;
