
export const breadCrumGenerator = (products: any, params: any) => {
    const breadCrum: any = [];
  products.data.breadCrum.map((item: any, index: number) => {
    const restLink = params.category.slice(1, index + 1);
    const href = restLink.join("/");
    breadCrum.push({
      name: item.toUpperCase(),
      link: index === 0 ? "/" : "category/" + href,
    });
  });
  return breadCrum
}

export const getSubCategory = (params:any, fullCategories: any) => {
      const paramQuery = [...params.category];
      paramQuery.shift();
      const category = fullCategories.data.find(
        (item: any) => item.slug === paramQuery[0]
      );
      const subCategory: any = [];
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
      return subCategory
    };


  // function run pagination
  export const generatePagination = (currentPage :number, totalPages : number) => {
    const maxPagesToShow = 6; // Maximum number of pages to display
    const pages = [];
  
    if (totalPages <= maxPagesToShow) {
      // If there are fewer total pages than the maximum to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
       if (currentPage  < 5) {
         for (let i = 1; i<= 5; i++ ) {
           pages.push(i)
         }
         pages.push('...')
         pages.push(totalPages)
       }
     
        if (currentPage >= 5) {
          pages.push(1)
          pages.push('...')
          for (let i = 4 ; i <= totalPages ; i++) {
            pages.push(i)
          }
        }
    }
  
    return pages
  }


  //await function simulator 
export  const wait = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

//order by price

export const orderByPrice = (products: any, order: string) => {
  const newProducts = products.sort((a: any, b: any) => {
    const f = Number(a.valueRange.min)
    const t = Number(b.valueRange.min)
    if(order === 'default') return
    if (order === "asc") {
      return f - t
    } else {
      return t - f
    }
  });
  return newProducts
}
