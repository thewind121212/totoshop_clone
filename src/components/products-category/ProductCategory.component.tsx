import Link from "next/link";
import CardProduct from "../card-product/CardProduct.component";
import { getFullCategories } from "@/app/api/categories/route";

async function ProductCategory({ productsRef, params }: any) {
  const products = await productsRef;
  const { data, totalProducts, page } = products;
  let subCategory: any[] = [];

  let breadCrum: any = [];

  data.breadCrum.map((item: any, index: number) => {
    const restLink = params.category.slice(1, index + 1);
    const href = restLink.join("/");
    breadCrum.push({
      name: item.toUpperCase(),
      link: index === 0 ? "/" : "category/" + href,
    });
  });

    const paramQuery = [...params.category];
    paramQuery.shift();
    const dataCategories = await getFullCategories();
    const category = dataCategories.data.find(
      (item: any) => item.slug === paramQuery[0]
    );
    if (paramQuery.length === 1) {
      category.subCategoryItems.map((item: any) => {
        const name = item.name.split(" ");
        name.pop();
        const completeName = name.join(" ");

        const buildChoseLink = {
          name: completeName.toUpperCase(),
          link: `/category/${paramQuery[0]}/${item.slug}`,
        };
        subCategory.push(buildChoseLink);
      });
    }

    if (paramQuery.length === 2 || paramQuery.length === 3) {
      const detailCategory = category.subCategoryItems.find(
        (item: any) => item.slug === paramQuery[1]
      );
      detailCategory.detailCategoryItems.map((item: any) => {
        const name = item.name.split(" ");
        name.pop();
        const completeName = name.join(" ");
        const buildChoseLink = {
          name: completeName.toUpperCase(),
          link: `/category/${paramQuery[0]}/${paramQuery[1]}/${item.slug}`,
        };
        subCategory.push(buildChoseLink);
      });
  }

  // const data = await products
  return (
    <div className="w-full h-auto">
      <div className="w-full max-w-[1200px] h-auto mx-auto ">
        {/* category interact loading */}
        <div className="py-6 px-[14px] h-auto ">
          <div className="w-full h-full flex ">
            <div className="w-auto h-auto basis-8/12 ">
              <div className="w-full">
                <div className="m-2 w-[100%] flex">
                  {breadCrum.map((item: any, index: number) => {
                    return (
                      <>
                        <Link
                          className="hover:text-[#00b156] duration-100"
                          key={index}
                          href={item.link}
                        >
                          {item.name}
                        </Link>
                        <div className="mx-2">
                          {breadCrum.length - 1 == index ? "" : "/"}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex justify-start gap-[5px] flex-wrap">
                {subCategory.map((item: any, index: number) => {
                  return (
                    <Link
                      href={item.link}
                      className="py-[16px] px-[25px] w-[auto] h-[auto] flex items-center justify-center bg-slate-100"
                      style={{
                        boxShadow:
                          "    box-shadow: 0 4px 4px rgba(99,109,126,.08)",
                      }}
                      key={index}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="w-auto  basis-4/12">
              <div className="w-full h-1/2 flex justify-end items-center">
                <div className="m-2">
                  {breadCrum[breadCrum.length - 1].name}
                </div>
                <div className="">/</div>
                <div className="m-2 ">{`Trang ${page} - ${totalProducts} sản phẩm`}</div>
              </div>
              <div className="w-full h-1/2 flex justify-between items-center">
                <div className="m-2 w-[30%] ">order</div>
                <div className="m-2 w-[30%] ">filter</div>
              </div>
            </div>
          </div>
        </div>
        {/* category display loadin*/}
        <div className="w-full h-auto flex flex-wrap">
          {data.products.map((item: any, index: any) => {
            return (
              <CardProduct
                key={item.id}
                id={item.id}
                like={item.likes}
                thumbnail={item.thumbnail_img}
                productName={item.name}
                productPrice=""
                colorArray={[]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
