"use client";
import { useState } from "react";
import Slider from "react-slick";
import classes from "./middleCarousel.styles.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './slickModify.css'
import Image from "next/image";
import NextArrow from "../../UI/arrow/NextArrow.component";
import PreviousArrow from "../../UI/arrow/PreviousArrow.component";



const carouselData = [
  {
    id: 0,
    image: "/banner/1.png",
  },
  {
    id: 1,
    image: "/banner/2.png",
  },
  {
    id: 2,
    image: "/banner/3.png",
  },
];

function MiddleCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);


  const settings = {
    className: "slider variable-width",
    infinite: true,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
          variableWidth: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current: any, next: any) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 900,
        settings: {
        variableWidth: false,
        }
      }
    ],
  };




  return (
    <div className="my-[50px]" >
      <Slider {...settings}>
        {carouselData.map((item) => (
          <div
            key={item.id}
            className={`${classes.bannerChild} ${
              activeSlide === item.id && classes.active
            }`}
            style={{ width: "60vw" }}
          >
            <div className={classes.imageWrap} >
              <Image
                src={item.image}
                alt="image-1"
                width={1920}
                height={500}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MiddleCarousel;
