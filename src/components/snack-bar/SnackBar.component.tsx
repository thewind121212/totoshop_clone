"use client";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/reduxHook";
import { toogleSnackBar } from "@/redux/Features/UI/snackBar.slice";
import { AiFillWarning, AiOutlineCheck } from "react-icons/ai";

import classes from "./snackBar.styles.module.css";


function SnackBar() {
  const snackBarRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const snackBar = useAppSelector((state) => state.snackBarStatus);

  useEffect(() => {
    clearTimeout(snackBarRef.current);

    if (snackBar.show) {
      snackBarRef.current = setTimeout(() => {
        dispatch(toogleSnackBar({ show: false, notificationStack: snackBar.notificationStack}));
      }, 2500);
    }

    return () => {
      clearTimeout(snackBarRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snackBar]);

  return (
    <div className={`${classes.snackBarRoot} ${              snackBar.show ? classes.show : ""} `}>
      {snackBar.notificationStack.map((notification: any) => {
        return (
          <div
            className={classes.snackBar}
            key={Math.random()}
            style={{
              backgroundColor: `${
                notification.type === "error" ? "rgb(211, 47, 47)" : "green"
              }`,
            }}
          >
            <div className={classes.snackBarWrap}>
              <div className={classes.snackBarStatus}>
                {notification.type === "error" && (
                  <AiFillWarning
                    style={{
                      color: "black",}}/>
                )}
                {notification.type === "success" && (
                  <AiOutlineCheck
                    style={{
                      color: "white",}}/>
                )}
              </div>
              <div className={classes.snackBarContent}>
                <p> {notification.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SnackBar;
