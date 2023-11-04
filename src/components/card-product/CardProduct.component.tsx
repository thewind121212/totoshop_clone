"use client";
import { useState, useRef } from "react";
import Image from "next/image";

//helper function organize data for viewer

const organizeData = (data: any) => {
  const colorArray: any[] = [];
  for (const [key, value] of Object.entries<{ [key: string]: { value: any } }>(
    data.productInfo
  )) {
    colorArray.push(value.colorImage);
  }
  return colorArray;
};

function CardProduct({
  thumbnail,
  productName,
  colorArray,
  like,
  price,
  product
}: {
  id: string;
  like: string;
  thumbnail: string;
  productName: string | null;
  price: any;
  colorArray: any[] | null;
  product: any
}) {
  const [image, setImage] = useState<any>(thumbnail);
  const timeoutRef = useRef<any>(null);
  const [imageLoadingState, setImageLoadingState] = useState<any>(true);


  let colors = null
  if (colorArray === null) {
   colors = organizeData(product);
  }
  else {
    colors = colorArray
  }

  //run usequery

  const handleChosePreview = (imageLink: any) => {
    if (imageLink === image) {
      setImage(thumbnail);
    } else {
      setImage(imageLink);
    }
  };

  const handleRevertToThumbnail = () => {
    if (image === thumbnail) return;
    timeoutRef.current = setTimeout(() => {
      setImage(thumbnail);
    }, 500);
  };

  return (
    <div
      className="basis-3/12 pl-2 pt-4 max-[1024px]:basis-3/12 max-[768px]:basis-6/12 max-[425px]:basis-full"
      onMouseLeave={() => handleRevertToThumbnail()}
      onMouseOver={() => clearTimeout(timeoutRef.current)}
    >
      <div className="w-full flex flex-nowrap justify-center items-center px-2.5 py-[15px] group ">
        <div className="w-full h-auto overflow-hidden shadow-[2px_2px_11px_hsla(0,3%,7%,0.1)] rounded-md">
          <div className="w-full h-auto relative overflow-hidden">
            <div className="w-full overflow-hidden transition-all duration-[0.3s] ease-[ease] delay-[0s] hover:scale-110">
              <Image
                alt="thumbnail"
                priority
                src={image}
                width={500}
                loading="eager"
                height={200}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "50% 50%",
                }}
                onLoadingComplete={() => {
                  setImageLoadingState(false);
                }}
              />
            </div>
            {imageLoadingState && (
              <div
                className="skeleton w-full h-full bg-slate-600 absolute top-0 left-0"
                style={{ position: "absolute", zIndex: "1" }}
              />
            )}
            <div className="absolute w-full h-[35px] bottom-[-35px] transition-all duration-[0.3s] ease-[ease] delay-[0s] bg-[white] px-2.5 py-[5px] group-hover:bottom-0">
              <div className="flex justify-start items-center gap-[5px]">
                {colors.map((item: any, index: any) => {
                  const isActived = item === image ? "border border-solid border-[rgb(96,132,202)]" : "";
                  return (
                    <div
                      className={`${"items-center bg-inherit cursor-pointer flex h-[25px] justify-center w-[25px] rounded-[3px]"} ${isActived}`}
                      key={index}
                      onClick={() => handleChosePreview(item)}
                    >
                      <Image
                        src={item}
                        alt={item}
                        width={500}
                        height={200}
                        style={{ objectFit: "cover", aspectRatio: "1/1" }}
                        loading="eager"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="items-center justify-center shadow-[0_4px_6px_rgba(0,0,0,0.07)] text-black flex gap-[5px] absolute z-10 p-[3px] rounded-sm border-0 right-[9px] bottom-[9px] cursor-pointer" style={{background: "hsla(0, 0%, 100%, 0.6)"}}>
              <div className="w-[14px] h-[12px]">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <p className="text-[#003644] text-[13px] font-semibold leading-[14px]">{like}</p>
            </div>
          </div>
          <div className="w-full h-[65px] px-2.5 py-[5px]">
            <div className="w-full h-full flex gap-[5px] flex-col">
              <div className="w-full text-sm font-[450] leading-normal text-black not-italic overflow-hidden uppercase cursor-pointer transition-all duration-[0.2s] ease-[ease-in-out] hover:text-[#00b156] hover:font-[500]">{productName}</div>
              <div className="w-full h-auto flex justify-between items-center">
                <div
                  className="text-sm"
                >{`${price.min}đ`}</div>
                <div className="items-center border box-border text-[#003644] cursor-pointer flex gap-0.5 h-[26px] justify-center px-1.5 py-px rounded-[3px] border-solid border-[#003644] bg-transparent">
                  <Image
                    src="/icons/addCart.svg"
                    alt="cart-add"
                    width={12}
                    height={11}
                    style={{ width: "auto", height: "auto" }}
                    priority
                  />
                  <div className="text-xs font-normal leading-normal text-[#003644] not-italic">Thêm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
