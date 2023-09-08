'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css' 
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

const fakePolicy = [
    {
        id: 0,
        image: '/policy/policy1.jpg',
    },
    {
        id: 1,
        image: '/policy/policy2.jpeg',
    }
]

function PolicyCarousel() {

    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

  return (
    <div className='mt-[50px] w-full'>
        <Slider {...settings}>
            {fakePolicy.map((item) => (
                <div key={item.id} className="w-full h-auto">
                    <Image src={item.image} alt="policy" width={4000} height={200} style={{objectFit: 'contain', height:'auto'}} />                
                </div>
            ))}
        </Slider>
    </div>
  )
}

export default PolicyCarousel