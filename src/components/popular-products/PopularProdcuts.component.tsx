"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import classes from "./popularProduct.styles.module.css";
import CardProduct from "../card-product/CardProduct.component";
import { object } from "yup";

const popularProductId = [
  "37880133",
  "37880120",
  "37880138",
  "37880145",
  "37880459",
  "37880373",
  "37880386",
  "37880397",
];

function PopularProducts() {
  const popularProductsQuery = useQuery({
    queryKey: ["popular-products"],
    queryFn: () =>
      fetch("/api/homepage/popular-products").then((res) =>
        processDataFetched(res)
      ),
    refetchOnWindowFocus: false,
  });

  const processDataFetched = async (data: any) => {
    const dataJson = await data.json();
    const dataReturn = [];

    for (let i = 0; i < dataJson.length; i++) {
      const colorArray: any = [];
      Object.values(dataJson[i].color).map((item: any) => {
        colorArray.push(item.colorImage);
      });


      const dataPatern = {
        id: dataJson[i].id,
        name: dataJson[i].name,
        price: dataJson[i].price,
        thumbnail: dataJson[i].thumbnail,
        colorArray: colorArray,
      };
      dataReturn.push(dataPatern);
    }
    return dataReturn;
  };

  return (
    <div className={classes.popularProductsRoot}>
      <div className={classes.popularProductsHeader}>
        <div className={classes.popularProductsHeaderText}>
          SẢN PHẨM NỔI BẬT
        </div>
        <div className={classes.popularProductsHeaderMenu}>
          <div className={classes.popularProductsHeaderMenuItem}>đồ nam</div>
          <div className={classes.popularProductsHeaderMenuItem}>đồ nữ </div>
          <div className={classes.popularProductsHeaderMenuItem}>unisex</div>
          <div className={classes.popularProductsHeaderMenuItem}> áo khoác</div>
        </div>
      </div>
      <div
        className={classes.popularProductsGallery}
        style={{ height: popularProductsQuery.isLoading ? "815px" : "auto" }}
      >
        {popularProductsQuery.isLoading && <div className={classes.spinner} />}
        {popularProductsQuery.data?.map((product: any) => {
          return (
            <CardProduct
              key={product.id}
              id={product.id}
              thumbnail={product.thumbnail}
              productName={product.name}
              productPrice={product.price + "đ"}
              colorArray={product.colorArray}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PopularProducts;
