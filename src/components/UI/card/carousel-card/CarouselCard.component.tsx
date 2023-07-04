import React from 'react'
import classes from './carouselCart.style.module.css' 

function CarouselCard() {
  return (
    <div className={classes.carouselCard}>
        <h6 className={classes.carouselCardHeader}> Áo Khoác</h6>
        <p className={classes.carouseCardContent}> Sản phẩm áo khoác ĐA DẠNG lựa chọn </p>
    </div>
  )
}

export default CarouselCard