


// const wait = (ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export const getCategoryProduct = async (params:string) => {
    const dataFetching = await fetch(`http://192.168.0.253:4000/categories/category?${params}`, {cache: 'no-cache'}) 
    const data = await dataFetching.json()
    return data
}

export const getBanner = async () => {
  const dataFetching = await fetch(`http://192.168.0.253:4000/banner`, {cache: 'no-cache'})
  const data = await dataFetching.json()
  return data
}
 
