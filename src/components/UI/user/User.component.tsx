import React from "react";
import Image from "next/image";
import Link from "next/link";
import classes from './user.style.module.css'

function User() {
  return (
    <Link href="/auth" className={classes.userBox}>
      <Image
        src="/icons/user.png"
        width={25}
        height={25}
        alt="totoday-user"
        style={{ cursor: "pointer", objectFit: "cover" }}
      ></Image>
    </Link>
  );
}
export default User;
