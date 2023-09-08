"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCard from "../UI/card/news-card/NewsCard.component";
import NextArrow from "../UI/arrow/NextArrow.component";
import PreviousArrow from "../UI/arrow/PreviousArrow.component";
import NewsCardSmall from "../UI/card/news-card/NewsCardSmall.component";

const dataDummy = [
  {
    id: 1,
    image: "/news/1.png",
    title: "#ĐẠI TIỆC MỪNG SINH NHẬT TOTODAY TRÒN 1 TUỔI",
  },
  {
    id: 2,
    image: "/news/2.png",
    title: "#MỞ BÁN RANDOM BOX CHỈ VỚI GIÁ 299.000Đ",
  },
  {
    id: 3,
    image: "/news/3.png",
    title: "#BLUE COLLECTION - GAM MÀU CỦA THỜI ĐẠI",
  },
  {
    id: 4,
    image: "/news/4.png",
    title: "#RED COLLECTION - BIỂU TƯỢNG NIỀM ĐAM MÊ NHIỆT HUYẾT",
  },
  {
    id: 5,
    image: "/news/5.png",
    title: "#YELLOW COLLECTION - SẮC MÀU CỦA MÙA HÈ",
  },
  {
    id: 6,
    image: "/news/6.png",
    title: "#SALE SIÊU TO - MỪNG ĐẠI LỄ",
  },
];

const dummyData2 = {
  promotion: [
    {
      id: 1,
      headerText: "ĐẠI TIỆC MỪNG SINH NHẬT TOTODAY TRÒN 1 TUỔI",
      image: "/news/promotion/1.png",
      date: "08/06/2023",
    },
    {
      id: 2,
      headerText: "MỞ BÁN RANDOM BOX CHỈ VỚI GIÁ 299.000Đ",
      image: "/news/promotion/2.png",
      date: "05/05/2023",
    },
  ],
  fashion: [
    {
      id: 1,
      headerText: "ĐA PHONG CÁCH HƠN VỚI CÁC KIỂU ÁO SƠ MI TRENDY NHÀ TOTODAY",
      image: "/news/fashion/1.jpeg",
      date: "17/02/2023",
    },
    {
      id: 2,
      headerText:
        "TOP 5 MẪU ÁO SƠ MI CỰC CHẤT CÙNG FRIENDs “BACK TO UNIVERSITY”",
      image: "/news/fashion/2.jpeg",
      date: "10/02/2023",
    },
  ],
  join: [],
};

function News() {
  const settings = {
    className: "center",
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PreviousArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto max-w-[1290px] mt-[50px]">
      <div className="grid grid-cols-3 px-[16px]">
        <div className="text-[26px] max-[768px]:text-[20px] col-span-2 max-[768px]:col-span-3 max-[768px]:text-center  ">TIN TỨC NỔI BẬT</div>
        <div className="flex justify-end uppercase max-[768px]:hidden  ">
          <div
            className="w-[185px] h-[54px] min-w-[64px] text-base py-[8px] px-[15px] border rounded-[3px] flex
           justify-center items-center border-black hover:text-white hover:bg-[#00B156] hover:border-[#00B156]
            duration-300 cursor-pointer  "
          >
            Xem tất cả
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[16px] mt-[16px] ">
        <Slider {...settings}>
          {dataDummy.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </Slider>
      </div>
      <div className="grid grid-cols-3 w-full h-auto mt-[16px] max-[762px]:grid-cols-1">
        <div className="h-auto col-span-1 px-[15px] max-[762px]:flex max-[762px]:justify-center max-[762px]:items-center max-[762px]:flex-col">
          <h1 className="max-[762px]:text-center">Tin khuyến mãi</h1>
          {dummyData2.promotion.map((item) => (
            <NewsCardSmall key={item.id} item={item} type="tin khuyến mãi" />
          ))}
        </div>
        <div className="h-auto col-span-1 px-[15px] max-[762px]:flex max-[762px]:justify-center max-[762px]:items-center max-[762px]:flex-col">
          <h1 className="max-[762px]:text-center">Tin thời trang</h1>
          {dummyData2.fashion.map((item) => (
            <NewsCardSmall key={item.id} item={item} type="tin thời trang" />
          ))}
        </div>
        <div className="h-auto col-span-1 px-[15px] max-[762px]:flex max-[762px]:justify-center max-[762px]:items-center max-[762px]:flex-col">
          <h1 className="max-[762px]:text-center">Gia Nhập Totoday</h1>
        </div>
      </div>
          <div
            className="w-1/2 mx-auto mt-[24px] h-[54px] min-w-[64px] text-base py-[8px] px-[15px] border rounded-[3px] hidden
           justify-center items-center border-black hover:text-white hover:bg-[#00B156] hover:border-[#00B156]
            duration-300 cursor-pointer max-[762px]:flex "
          >
            Xem tất cả
          </div>
    </div>
  );
}

export default News;
