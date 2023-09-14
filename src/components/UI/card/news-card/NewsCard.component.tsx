
import React from "react";
import Image from "next/image";

function NewsCard({ item }: any) {
  return (
    <div className="col-span-1 relative rounded group mx-[15px] overflow-hidden">
      <div className="w-full h-auto  relative group-hover:scale-[1.07] duration-[350ms] overflow-hidden  ">
        <Image
          src={item.image}
          alt={item.title}
          width={700}
          height={400}
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="w-full absolute p-[10px] bottom-0 z-20" style={{background:'linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.45) 37.5%, rgba(0, 0, 0, 0.85) 100%)'}}>
        <p className="text-[12px] text-white">{item.title}</p>
      </div>
    </div>
  );
}

export default NewsCard;