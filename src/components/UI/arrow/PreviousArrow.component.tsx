import React from 'react';
import classes from './arrow.styles.module.css'
import { AiOutlineLeft } from "react-icons/ai";


  function PreviousArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${classes.previousButton}`}
        style={{ ...style }}
        onClick={onClick}
      >
        <div className="w-full h-full flex justify-center items-center">
        <AiOutlineLeft style={{width: '100%', height: '100%',  color:"rgb(0, 177, 86)"}} />
        </div>
      </div>
    );
  }

export default PreviousArrow