import Image from "next/image";
import { Suspense } from "react";
import { ProductsLoading } from "./loading";
import { getFullCategories } from "@/app/api/categories/route";
import { breadCrumGenerator } from "@/utils/general-helper/helper";
import actions from "@/actions/actions.index";
import { Buffer } from "buffer";

import {
  getCategoryProduct,
  getBanner,
} from "../api/categories/category/route";
import ProductsCategory from "../../components/products-category/ProductCategory.component";

export default async function CateogryPure({
  params,
  searchParams,
}: {
  params: any;
  searchParams: any;
}) {
  const page = searchParams.page || 1;
  const orderBy = searchParams.order || "default";
  const filter = searchParams.filter || "none";
  const paramObject: any = {
    root: params.category[1],
    main: params.category[2] || "none",
    sub: params.category[3] || "none",
    filter: filter,
    page: page,
    order: orderBy,
  };
  const paramsBuilder = new URLSearchParams(paramObject).toString();
  const productsRef = getCategoryProduct(paramsBuilder);
  const getFullCategoriesRef = getFullCategories(params);
  const getAttributesRef = actions.getAttributes()

  
  let filterParam = null
  if (filter !== "none") {
   filterParam = JSON.parse(Buffer.from(filter, "base64").toString("ascii")) 
  }

  const [banner, products, categories, attributes] = await Promise.all([
    getBanner(),
    productsRef,
    getFullCategoriesRef,
    getAttributesRef
  ]);

  const breadCrum: any = breadCrumGenerator(products, params);
  const categoryFilter = categories.categories.data.find( (item: any) => item.slug === paramObject.root )


  const bannerData = banner.data.find(
    (item: any) => item.name === params.category[1]
  );
  return (
    <>
      <Image
        alt={bannerData.name}
        src={bannerData.img_link}
        width={2204}
        height={500}
        priority
      />
      <Suspense fallback={<ProductsLoading />}>
        <div className="w-full h-auto flex items-center justify-center">
          <ProductsCategory
            products={products}
            params={params}
            subCategories={categories.subCategories}
            categories={categoryFilter}
            breadCrum={breadCrum}
            paramsObject={paramObject}
            attributes={attributes}
            filterParam={filterParam}
            orderBy={orderBy}
          />
        </div>
      </Suspense>
    </>
  );
}
