import Carousel from "@/components/carousel/header-carousel/Carousel.component"
import RecommendCategory from "@/components/recommend-category/RecommendCategory.component"
import PopularProdcuts from "@/components/popular-products/PopularProdcuts.component"
import MiddleCarousel from "@/components/carousel/middle-carousel/MiddleCarousel.component"
import PolicyCarousel from "@/components/carousel/policy-carousel/PolicyCarousel.component"
import CollectionList from "@/components/collection-list/CollectionList.component"
import FeedBack from "@/components/feedback/FeedBack.component"
import Image from "next/image"
import News from "@/components/news/News.component"


export default function Home() {
  return (
    <div className="h-[2000px]">
      {/* carousel */}
      <Carousel/>
      {/* divide hr */}
      <div className="w-full mt-1 flex justify-center items-center">
        <hr  className="h-[3px] w-[50px] bg-black" />
        <p className="text-2xl mx-[8px] font-medium">BẠN ĐANG TÌM KIẾM?</p>
        <hr  className="h-[3px] w-[50px] bg-black" />
      </div>
      {/* reconmend */}
      <RecommendCategory/>
      {/* Popular product */}
      <PopularProdcuts/>
      <MiddleCarousel/>
      <div className="max-w-[1290px] h-auto p-[30px] mx-auto hover:scale-[1.05] duration-500 mt-[50px]">
          <Image src="/collections/collection1.png" alt="collection1" width={4000} height={4000} style={{objectFit: 'contain'}} />
      </div>
        <CollectionList/> 
        <PolicyCarousel/>
        <FeedBack/>
        <News/>
       </div>
  )
}
