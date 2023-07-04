import React from "react";
import Image from "next/image";
import classes from "./cart.styles.module.css";

function Cart() {
  return (
    <div className={classes.cartBox}>
      <div className={classes.cartIconWrap}>
        <Image
          className={classes.cartIcon}
          src="/icons/cart.png"
          width={25}
          height={25}
          alt="totoday-bag"
          style={{ cursor: "pointer", objectFit: "cover" }}
        />
      </div>
      <div className={classes.cartCount}>0</div>
    </div>
  );
}

export default Cart;
