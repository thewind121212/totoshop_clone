import { useEffect, useRef, useState } from "react";
import classes from "./rangeSlider.styles.module.css";
import { useAppDispatch , useAppSelector} from "@/redux/reduxHook";
import { changeFilterPriceAttribute } from "@/redux/Features/Filter/filter.slice";

function RangeSlider() {
  const [range, setRange] = useState<any>(0);
  const dispatch = useAppDispatch() 
  const refDebounce = useRef<any>(null)
  const refLinh = useRef<any>(null)
  const store = useAppSelector(state => state.filterStatus)

  useEffect(() => {
    if(!store.filterActive) {
      setRange(0)
      dispatch(changeFilterPriceAttribute('0'))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[store.filterActive])


  const onSliderchange = (e : any) => {
    clearTimeout(refDebounce.current)
      refDebounce.current = setTimeout(() => {
        dispatch(changeFilterPriceAttribute(refLinh.current.value))
      }, 200)
        setRange(e.target.value)
  }


  return (
    <div className="w-full h-auto flex flex-col justify-center items-center">
      <div className="w-[270px] h-[60px] flex justify-center items-end relative">
        <input
          className={classes.customRangeSlider}
          type="range"
          min="0"
          step="10000"
          ref={refLinh}
          max="1000000"
          value={range}
          onChange={onSliderchange}
        />
        <div className="w-[100px] h-auto absolute top-[2px] p-[3px] flex justify-center items-center bg-slate-300"
        style={{left: `${(range / 1000000) * (270 - 100)}px`}}
        >{range}đ</div>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>0đ</span>
        <span>1000000đ</span>
      </div>
    </div>
  );
}

export default RangeSlider;
