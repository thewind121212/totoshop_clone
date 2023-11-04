"use client";
import React from "react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import { useQuery } from "@tanstack/react-query";
import CardProduct from "../card-product/CardProduct.component";

import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1051 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1051, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 500 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};

function MixProducts() {

  const queryMixMatch  = useQuery({
    queryKey: ["popular-products"],
    queryFn: () =>
      fetch("/api/categories/jacket-mix").then(async(res) =>
      {
        const data =  await res.json()
        return data
      }
      ),
  });

  if(queryMixMatch.isLoading) return <></>

  if (queryMixMatch.data.data === undefined) return <></>

  return (
    <div className="max-w-[1440px] w-auto h-auto bg-white">
      <div className="w-full h-full pb-[40px] pt-[40px] pl-[30px] flex gap-[30px] justify-center items-center">
        <div className="w-[25%] h-auto basis-[1/8]">
          <Image
            src="/banner/mixBanner.png"
            alt="mix-banner"
            width={300}
            height={300}
            style={{ objectFit: "contain", aspectRatio: "1/1" }}
          ></Image>
        </div>
        <div className="w-[75%] h-auto">
          <Carousel responsive={responsive}>
            {queryMixMatch.data.data.map((item: any) => (
                <CardProduct
                    key={item.id}
                    id={item.id}
                    like="0"
                    price={{min: item.price, max: item.price}}
                    thumbnail={item.thumbnail}
                    productName={item.name}
                    colorArray={null}
                    product={item}
                />
            ))
             }
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default MixProducts;
