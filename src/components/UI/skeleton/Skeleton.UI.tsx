
const ProductControlerLoading = () => {
  return (
    <div className="w-full h-full flex border border-slate-400 animate-pulse rounded skeleton">
    <div className="w-auto h-auto basis-8/12 ">
      <div className="w-full">
        <div className="m-2 w-[30%] h-5 bg-slate-400 rounded-[9px] "></div>
      </div>
      <div className="w-full flex justify-start gap-[5px]">
        <div className="m-2 w-[15%] h-8 bg-slate-400 rounded-[9px]"></div>
        <div className="m-2 w-[15%] h-8 bg-slate-400 rounded-[9px]"></div>
        <div className="m-2 w-[15%] h-8 bg-slate-400 rounded-[9px]"></div>
        <div className="m-2 w-[15%] h-8 bg-slate-400 rounded-[9px]"></div>
      </div>
    </div>
    <div className="w-auto  basis-4/12">
      <div className="w-full h-1/2 flex justify-end items-center">
        <div className="m-2 w-[50%] h-5 bg-slate-400 rounded-[9px] "></div>
      </div>
      <div className="w-full h-1/2 flex justify-end items-center">
        <div className="m-2 w-[70%] h-5 bg-slate-400 rounded-[9px] "></div>
      </div>
    </div>
  </div>
  )
}

const CardLoading = () => {
  return (
    <div className=" col-span-1 border border-slate-400 rounded-[5px] skeleton">
      <div className="w-full h-[265px] bg-slate-600"></div>
      <div className="h-[65px] my-[5px] mx-[10px] flex flex-col items-center justify-center gap-[12px] ">
        <div className="w-[100%] h-auto">
          <div className="w-full h-5 bg-slate-400 rounded-[3px]"></div>
        </div>
        <div className="w-full h-auto flex justify-between">
          <div className="w-[30%] h-5 bg-slate-400 rounded-[3px]"></div>
          <div className="w-[40%] h-5 bg-slate-400 rounded-[3px]"></div>
        </div>
      </div>
    </div>
  );
};

export {
    ProductControlerLoading,
    CardLoading
}