"use client";
import React, { useEffect } from "react";
import CardProduct from "../card-product/CardProduct.component";
import Spinner from "../UI/spinner/Spinner.ui";


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

function PopularProducts() {
   const [product, setProduct] = React.useState<any>([]);


  useEffect(() => {
    const fetchPopularProducts = async () => {
      const data = await fetch("/api/homepage/popular-products");
      const afterData =  await processDataFetched(data);
      setProduct(afterData)
    }  

    fetchPopularProducts()

  },[])



  return (
    <div className="w-full h-auto flex flex-col items-center justify-center max-w-[1290px] mt-4 mx-auto my-0">
      <div className="w-full h-[50px] flex items-center justify-center px-2.5 py-0">
        <div className="text-[26px] font-semibold leading-normal">
          SẢN PHẨM NỔI BẬT
        </div>
      </div>
      <div
        className="w-[calc(100%_+_8px)] flex flex-wrap ml-2"
        style={{ height: product.length === 0 ? "815px" : "auto" }}
      >
        {product.length === 0 ? (
          <Spinner />
        ) : (
          product.map((product: any) => {
            return (
              <CardProduct
                key={product.id}
                like="0"
                id={product.id}
                thumbnail={product.thumbnail}
                productName={product.name}
                price={{ min: product.price, max: product.price }}
                colorArray={product.colorArray}
                product={[]}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default PopularProducts;
