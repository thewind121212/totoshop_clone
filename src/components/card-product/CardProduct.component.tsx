"use client";
import { useState, useRef } from "react";
import classes from "./cardProduct.styles.module.css";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { object } from "yup";


//helper function organize data for viewer

const organizeData = (data: any) => {
  const colorArray: any[] = [];
  for (const [key, value] of Object.entries<{[key: string]: {value: any}}>(data.productInfo)) {
     colorArray.push(value.colorImage)
  }
  return {colors: colorArray};
}

function CardProduct({
  thumbnail,
  productName,
  productPrice,
  id,
  colorArray,
  like
}: {
  id: string;
  like: string;
  thumbnail: string;
  productName: string | null;
  productPrice: string | null;
  colorArray: any[] ;
}) {
  const [image, setImage] = useState<any>(thumbnail);
  const timeoutRef = useRef<any>(null);
  const [imageLoadingState, setImageLoadingState] = useState<any>(true);
  //run usequery
  const productDetailQuery = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => 
      fetch(`/api/productDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      }).then(async (res) => {
        const dataObject = await res.json();
        const data = organizeData(dataObject.data);
        return {
          colors: colorArray.length === 0 ? data.colors : colorArray,
          price: dataObject.data.valueRange,
        } ;
      }),
      refetchOnWindowFocus: false,
  })



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
                loading="eager"
                height={200}
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: '50% 50%'
                }}
                onLoadingComplete={() => {setImageLoadingState(false)}}
              />
            </div>
            {imageLoadingState &&
            <div className="skeleton w-[272px] h-[272px] bg-slate-600 absolute top-0 left-0" style={{position: 'absolute', zIndex: '1'}} />
            }
            <div className={classes.cardProductPreview}>
              <div className={classes.cardProductPreviewWrap}>

                {productDetailQuery.isLoading || productDetailQuery.data?.colors === undefined ? <div>Loading...</div> :  productDetailQuery.data.colors.map((item, index) => {
                  const isActived = item === image ? classes.active : "";
                  return (
                    <div
                      className={`${classes.cardProductPreviewItem} ${isActived}`}
                      key={index}
                      onClick={() => handleChosePreview(item)}
                    >
                      <Image src={item} alt={item} width={500} height={200} style={{objectFit: 'cover', aspectRatio: '1/1'}} loading="eager"/>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.cardProductLike}>
                <Image src="/icons/heart.webp" alt="like" width={14} height={12} />
                <p className={classes.cardProductLikeText}>{like}</p>
             </div>  
          </div>
          <div className={classes.cardProductDown}>
            <div className={classes.cardProductDownWrap}>
              <div className={classes.cardProductDownText}>{productName}</div>
              <div className={classes.cardProductDownPriceCart}>
                <div className={classes.cardProductPrice}>{productPrice !== null ? productPrice : productDetailQuery.isLoading ? <div>loading</div>
                : `${productDetailQuery.data?.price.min}đ`       
              }</div>
                <div className={classes.cardProductAddCart}>
                  <Image
                    src="/icons/addCart.svg"
                    alt="cart-add"
                    width={12}
                    height={11}
                    style={{width: 'auto', height: 'auto'}}
                    priority
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
