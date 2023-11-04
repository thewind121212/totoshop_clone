"use client";
//core libraries
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHook";
import {
  changeFilterAllAttribute,
  toggleFilterActive,
  toggleOpenFilterSlider,
} from "@/redux/Features/Filter/filter.slice";
//components
import CardProduct from "../card-product/CardProduct.component";
import PageNavigate from "../page-navigate/PageNavigate.component";
import FilterSidebar from "../filter-sidebar-container/FilterSidebarContainer.component";
import CategoryController from "../category-controller/CategoryController.component";
import MixProducts from "../mix-products/MixProducts.component";
// helper
import { generatePagination } from "@/utils/general-helper/helper";
import { ProductsLoading } from "@/app/[...category]/loading";

function ProductCategory({
  products,
  breadCrum,
  subCategories,
  categories,
  paramsObject,
  attributes,
  filterParam,
  orderBy,
}: any) {
  const { data, totalProducts, page, totalPage } = products;
  const [loading, setLoading] = useState(true);


  const store = useAppSelector((state) => state.filterStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeFilterAllAttribute(filterParam));
  }, [filterParam, dispatch]);

  const router = useRouter();
  const pagination = generatePagination(page, totalPage);
  const pathName = usePathname();
  let categoriesTree: any = categories.subCategoryItems;

  const timer: any = useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);

    return () => {
      clearTimeout(timer);
      dispatch(toggleFilterActive(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  let filterSeachParam: any = "";
  if (store.filterActive) {
    filterSeachParam = `&filter=${btoa(JSON.stringify(store))}`;
  }

  let orderSeachParam: any = "";
  if (orderBy !== "default") {
    orderSeachParam = `&order=${orderBy}`;
  }

  const changePageHandler = (actions: string, targetPage: any | null) => {
    if (
      actions === "changePage" &&
      targetPage !== page &&
      targetPage !== "..."
    ) {
      setLoading(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        router.push(
          `${pathName}?page=${targetPage}${orderSeachParam}${filterSeachParam}`
        );
      }, 450);
    }
    if (actions === "next" && page < totalPage) {
      setLoading(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        router.push(`${pathName}?page=${page + 1}${filterSeachParam}`);
      }, 450);
    }
    if (actions === "prev" && page > 1) {
      setLoading(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        router.push(`${pathName}?page=${page - 1}${filterSeachParam}`);
      }, 450);
    }
  };

  if (paramsObject.main !== "none") {
    categoriesTree = categories.subCategoryItems.filter(
      (item: any) => item.slug === paramsObject.main
    );
  }

  const onFilterSubmit = (payload: null | string = null) => {
    let filter: any = null;
    filter = { ...store };
    if (payload == "clearFilter") {
      dispatch(toggleFilterActive(false));
      filter = {
        filterSliderOpen: false,
        filterActive: false,
        subCategory: [],
        colorAttribute: [],
        sizeAttribute: [],
        priceAttribute: "0",
      };
    }
    if (!filter.filterActive) {
      router.push(`${pathName}`);
      return;
    }
    filter.filterSliderOpen = false;
    const filterEncode = btoa(JSON.stringify(filter));
    if (filterParam !== null) {
      const filterParamEncode = btoa(JSON.stringify(filterParam));
      if (filterEncode === filterParamEncode) {
        return;
      }
    }

    setLoading(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      router.push(`${pathName}?filter=${filterEncode}${orderSeachParam}`);
      dispatch(toggleOpenFilterSlider());
    }, 200);
  };

  let dataSlice : any[] = []
  if (data.products.length > 20) {
   dataSlice =  data.products.slice(0,20)
  }  

  return (
    <div className="w-full h-auto ">
      <div className="w-full max-w-[1440px] h-auto mx-auto">
        {/* filter sidebar overlay */}
        <div
          className="w-[100vw] min-h-[100vh] fixed top-0 left-0 z-[991] translate-x-[0] flex justify-end bg-[#00000080]"
          style={{
            opacity: store.filterSliderOpen ? 1 : 0,
            transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            visibility: store.filterSliderOpen ? "visible" : "hidden",
          }}
        >
          <FilterSidebar
            isFilterSidebarOpen={store.filterSliderOpen}
            menuCategory={categoriesTree}
            attributes={attributes.data}
            filterStatus={store.filterActive}
            filterSubmit={onFilterSubmit}
          />
          <div
            className="min-h-[100vh] w-fill translate-x-[-360px]"
            style={{
              transition: "all 225ms",
              width: store.filterSliderOpen ? "calc(100vw - 360px)" : "0px",
            }}
            onClick={() => dispatch(toggleOpenFilterSlider())}
          ></div>
        </div>
        {/* category controller */}
        <CategoryController
          breadCrum={breadCrum}
          subCategories={subCategories}
          page={page}
          totalProducts={totalProducts}
          paramsObject={paramsObject}
          openFilterSideBar={() => dispatch(toggleOpenFilterSlider())}
          filterSearchParam={filterSeachParam}
          patchName={pathName}
          orderBy={orderBy}
          setLoading={() => setLoading(true)}
          filterActive={store.filterActive}
          clearFilter={() => {
            onFilterSubmit("clearFilter");
          }}
        />

        {loading ? (
          <ProductsLoading />
        ) : (
          <>
            {/* block 1 */}
            <div className="max-w-[1200px] w-auto h-auto flex flex-wrap m-auto">
              {data.products.map((item: any, index: any) => {
                if (index > 19) return;
                return (
                  <CardProduct
                    key={item.rootId}
                    id={item.rootId}
                    like={item.like}
                    price={item.valueRange}
                    thumbnail={item.thumbnail}
                    productName={item.name}
                    colorArray={null}
                    product={item}
                  />
                );
              })}
            </div>
            {/* block mix */}
            <MixProducts />
            {/* block 2 */}
            <div className="max-w-[1200px] w-auto h-auto flex flex-wrap m-auto">
              {dataSlice.map((item: any, index: any) => {
                return (
                  <CardProduct
                    key={item.rootId}
                    id={item.rootId}
                    like={item.like}
                    price={item.valueRange}
                    thumbnail={item.thumbnail}
                    productName={item.name}
                    colorArray={null}
                    product={item}
                  />
                );
              })}
              </div>
            {/* end products list */}
            <PageNavigate
              totalPage={totalPage}
              pagination={pagination}
              changePageHandler={changePageHandler}
              page={page}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCategory;
