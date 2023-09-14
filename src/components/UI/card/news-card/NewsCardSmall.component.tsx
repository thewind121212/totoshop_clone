import React from 'react'
import Image from 'next/image'
import {AiOutlineArrowRight} from 'react-icons/ai'

function NewsCardSmall({item, type}: any) {
  return (
            <div key={item.id} className="w-full max-w-[416px] h-[170px] p-[16px] border border-solid border-[#e0e0e0] my-[12px] cursor-pointer transform-gpu
            hover:-translate-y-[4px] duration-300 
            
            
            " style={{boxShadow:'rgba(19, 18, 18, 0.1) 2px 2px 11px'}}>
              <div className="w-full h-auto flex flex-wrap">
                <div className="basis-5/12  ">
                  <Image src={item.image} alt={item.headerText} height={200} width={200} priority style={{objectFit: 'contain'}} />
                </div> 
                <div className="basis-7/12 p-[8px] flex-grow-0">
                  <p className='text-[11px] mb-[10px] text-[#00b156] uppercase cursor-pointer'>{type}</p>
                  <p className='text-[15px] line-clamp-2 mb-[10px] font-[450] hover:text-[#00b156] duration-200 cursor-pointer'>{item.headerText}</p>
                </div>
                <div className="basis-full mt-[8px] flex justify-between cursor-pointer">
                  <p className='text-[14px]  '>{item.date}</p>
                  <div className="flex justify-center items-center gap-[10px] cursor-pointer">
                  <p className='text-[16px] text-[#757575] '>Đọc thêm</p>
                  <AiOutlineArrowRight className='text-[#757575] ' style={{width:'24px', height: '24px'}}/>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default NewsCardSmall