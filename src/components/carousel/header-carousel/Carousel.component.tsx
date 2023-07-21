"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classes from "./carousel.styles.module.css";
import { useAppSelector } from "@/redux/reduxHook";

//component
import CarouselCard from "../../UI/card/carousel-card/CarouselCard.component";


const dummy_data = [
  { id: 1, imgPath: "/carousel/1.png", link: "/collection" },
  { id: 2, imgPath: "/carousel/2.png", link: "/collection" },
  { id: 3, imgPath: "/carousel/3.png", link: "/collection" },
  { id: 4, imgPath: "/carousel/4.png", link: "/collection" },
  { id: 5, imgPath: "/carousel/5.png", link: "/collection" },
];

function Carousel() {
  //react core
  const [carouselId, setCarouselId] = useState(1);


  //useEffect react to autoslide the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselId === dummy_data.length) {
        setCarouselId(1);
      } else {
        setCarouselId(carouselId + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselId]);

  //func
    const handleCarouselIdChoose = (id: number) => {
        if (carouselId === id) return;
        setCarouselId(id);
    } 



  return (
    <div className={classes.carouseWrap} >
      <div className={classes.carouseImagesWrap} >
        {dummy_data.map((item) => {
          return (
            <div
              key={item.id}
              className={`${classes.carouseItem} ${
              carouselId === item.id && classes.active
              }`}
            >
              <Image
                alt="imgPath"
                src={item.imgPath}
                width={1440}
                height={480}
                style={{ objectFit:"cover", maxHeight: "480px", height: "30vw" }}
              />
            </div>
          );
        })}
        <CarouselCard/>
      </div>
      <div className={classes.carouseDots}>
        <div className={classes.carouseDotsWrap}>
        {dummy_data.map((item) => {
          return (
            <div key={item.id} className={classes.dotWrap} onClick={() => handleCarouselIdChoose(item.id)}>
                <div  className={`${classes.dot} ${carouselId === item.id && classes.dotActive}`}></div>
            </div>
          ) 
        })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
