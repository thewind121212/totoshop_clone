import Image from "next/image";
import { Suspense } from "react";
import { ProductsLoading } from "./loading";

import {
  getCategoryProduct,
  getBanner,
} from "../api/categories/category/route";
import ProductsCategory from "../../components/products-category/ProductCategory.component";

export default async function CateogryPure({ params }: { params: any }) {
  const paramObject: any = {
    root: params.category[1],
    main: params.category[2] || "none",
    sub: params.category[3] || "none",
  };
  const searchParams = new URLSearchParams(paramObject).toString();
  const productsRef = getCategoryProduct(searchParams);
  const banner = await getBanner();

  const bannerData = banner.data.find(
    (item: any) => item.name === params.category[1]
  );
  return (
    <>
      <Image
        alt={bannerData.name}
        src={bannerData.img_link}
        width={2000}
        height={1000}
        loading="lazy"
      />
      <Suspense fallback={<ProductsLoading />}>
        <div className="w-full h-auto flex items-center justify-center">
          <ProductsCategory productsRef={productsRef} params={params} />
        </div>
      </Suspense>
    </>
  );
}
