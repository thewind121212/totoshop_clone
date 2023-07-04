'use client'
import  { useState, useRef , useEffect} from "react";
import Image from "next/image";
import desktopStyle from "./searchDesktop.styles.module.css";
import mobileStyle from "./searchMobile.styles.module.css";


const useOutsideClick = (callback: any) => {
  const ref = useRef<any>() ;
  

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current?.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};


function Search({isMobile}: {isMobile: boolean}) {
  const searchInput = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<any>(false);
  const [searchClick, setSearchClick] = useState<any>(false);
  const [timoutId, setTimeoutId] = useState<any>(null);
  const classes = isMobile ? mobileStyle : desktopStyle;

  const handeClickOutSide = () => {
    setFocus(false);
  }

  const ref = useOutsideClick(handeClickOutSide);

  const handlerSearch = (event:any) => {
    event.preventDefault()
    clearTimeout(timoutId)
    setSearchClick(true)
    const newTimeOutId = setTimeout(() => {
      setSearchClick(false)
    }, 600)
  }


  const focusStyle = focus ? `${classes.searchBoxFocus}` : `${classes.searchBox}`;

  return (
    <div className={`${classes.searchBox} ${focusStyle}`} ref={ref} >
      <input type="text" ref={searchInput} onFocus={() => setFocus(true)} className={classes.searchBar}  placeholder="Tìm kiếm" />
      <div className={classes.searchBtn} onClick={handlerSearch}>
          <svg
            className={classes.searchIcon}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
          </svg>
          <div className={`${classes.searchAnimationLayer} ${searchClick && classes.onClick}`}></div>
      </div>
      <div className={classes.searchDropdown}>
        <p className={classes.labelDropdown}>Tìm kiếm gần đây</p>
        <div className={classes.recentSearch}>
          <Image alt="recent-search" src="/icons/recent-search.svg" width={26} height={26}/>
          <p>Tìm kiếm phổ biến</p>
        </div>
        <div className={classes.reconmmendDropdown}>
          <div className={classes.reconmmendItem}>Đồ nam</div> 
          <div className={classes.reconmmendItem}>Sơ mi nam</div> 
          <div className={classes.reconmmendItem}>Đồ nữ</div> 
          <div className={classes.reconmmendItem}>Áo thun nữ</div> 
        </div>
      </div>
    </div>
  );
}

export default Search;
