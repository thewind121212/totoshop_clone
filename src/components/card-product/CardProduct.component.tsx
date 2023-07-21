"use client";
import { useState, useRef } from "react";
import classes from "./cardProduct.styles.module.css";

import Image from "next/image";
import { clear } from "console";

function CardProduct({
  thumbnail,
  productName,
  productPrice,
  id,
  colorArray,
}: {
  id: string;
  thumbnail: string;
  productName: string;
  productPrice: string;
  colorArray: any[];
}) {
  const [image, setImage] = useState<any>(thumbnail);
  const timeoutRef = useRef<any>(null);

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
      className={classes.cardProductRoot}
      onMouseLeave={() => handleRevertToThumbnail()}
      onMouseOver={() => clearTimeout(timeoutRef.current)}
    >
      <div className={classes.cardProductContainer}>
        <div className={classes.cardProductWrap}>
          <div className={classes.cardProductUpper}>
            <div className={classes.cardProductImageContain}>
              <Image
                alt="thumbnail"
                src={image}
                width={500}
                height={200}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className={classes.cardProductPreview}>
              <div className={classes.cardProductPreviewWrap}>

                {colorArray.map((item, index) => {
                  const isActived = item === image ? classes.active : "";
                  return (
                    <div
                      className={`${classes.cardProductPreviewItem} ${isActived}`}
                      key={index}
                      onClick={() => handleChosePreview(item)}
                    >
                      <Image src={item} alt={item} width={25} height={20} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.cardProductLike}>
                <Image src="/icons/heart.webp" alt="like" width={14} height={12} />
                <p className={classes.cardProductLikeText}>0</p>
             </div>  
          </div>
          <div className={classes.cardProductDown}>
            <div className={classes.cardProductDownWrap}>
              <div className={classes.cardProductDownText}>{productName}</div>
              <div className={classes.cardProductDownPriceCart}>
                <div className={classes.cardProductPrice}>{productPrice}</div>
                <div className={classes.cardProductAddCart}>
                  <Image
                    src="/icons/addCart.svg"
                    alt="cart-add"
                    width={12}
                    height={11}
                  />
                  <div className={classes.cardProductAddCartText}>Thêm</div>
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
